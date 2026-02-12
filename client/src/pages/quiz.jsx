import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, CheckCircle, ArrowRight, Trophy, AlertCircle, Clock } from 'lucide-react';
import { makeRequest } from '../lib/utils';

const TIME_PER_QUESTION = 12;

const Quiz = () => {
    const { room_uid } = useParams();
    const navigate = useNavigate();

    const [gameState, setGameState] = useState('entry');
    
    const [teamName, setTeamName] = useState('');
    const [questions, setQuestions] = useState([]);
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]); 
    const [currentSelection, setCurrentSelection] = useState(null); 
    
    const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await makeRequest(`/quiz/${room_uid}`, 'GET');
                
                const questionList = data.questions || data || [];
                
                if (questionList.length === 0) {
                    throw new Error("No questions available for this room.");
                }

                setQuestions(questionList);
            } catch (err) {
                console.error("Failed to fetch questions:", err);
                
                setQuestions([
                    {
                        uid: "q1",
                        question: "Who is the captain of CSK?",
                        options: ["Dhoni", "Ruturaj", "Jadeja", "Raina"]
                    },
                    {
                        uid: "q2",
                        question: "Max overseas players allowed in playing XI?",
                        options: ["3", "4", "5", "2"]
                    }
                ]);
                setError("Server unreachable. Loaded sample questions.");
            }
        };

        if (room_uid) {
            fetchQuestions();
        }
    }, [room_uid]);

    useEffect(() => {
        let interval;
        if (gameState === 'quiz') {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 0) return 0;
                    return prev - 0.1;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [gameState, currentQuestionIndex]);

    useEffect(() => {
        if (gameState === 'quiz' && timeLeft <= 0) {
            handleNextOrSubmit();
        }
    }, [timeLeft, gameState]);


    const handleStart = (e) => {
        e.preventDefault();
        if (!teamName.trim()) {
            setError("Please enter a team name to start.");
            return;
        }
        setError('');
        setGameState('quiz');
        setTimeLeft(TIME_PER_QUESTION);
    };

    const handleOptionSelect = (option) => {
        setCurrentSelection(option);
    };

    const handleNextOrSubmit = () => {
        const rawTimeTaken = TIME_PER_QUESTION - timeLeft;
        const timeTaken = Math.min(Math.max(rawTimeTaken, 0), TIME_PER_QUESTION);

        const newAnswerEntry = {
            questionId: questions[currentQuestionIndex].uid,
            option: currentSelection,
            timeTaken: parseFloat(timeTaken.toFixed(2))
        };

        const updatedAnswers = [...answers, newAnswerEntry];
        setAnswers(updatedAnswers);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentSelection(null);
            setCurrentQuestionIndex(prev => prev + 1);
            setTimeLeft(TIME_PER_QUESTION); 
        } else {
            finalizeQuiz(updatedAnswers);
        }
    };

    const finalizeQuiz = async (finalAnswers) => {
        setLoading(true);
        setGameState('submitting');
        
        const payload = {
            teamname: teamName,
            optionsChosen: finalAnswers, 
            room_uid: room_uid
        };

        try {
            await makeRequest(`/quiz/${room_uid}`, 'POST', payload);
            setGameState('finished');
        } catch (err) {
            console.error("Submission error:", err);
            setError(err.message || "Failed to submit results.");
            setGameState('finished'); 
        } finally {
            setLoading(false);
        }
    };

    if (gameState === 'entry') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0c1629] relative overflow-hidden p-4">
                <BackgroundEffects />
                <Card className="w-full max-w-md bg-[#1a2436]/90 border border-blue-900/30 shadow-2xl backdrop-blur-xl relative z-10">
                    <CardHeader className="space-y-2 pb-6">
                        <CardTitle className="text-3xl font-bold text-center tracking-tighter text-white">
                            <span className="bg-gradient-to-r from-blue-400 to-orange-500 bg-clip-text text-transparent">
                                IPL Battle Quiz
                            </span>
                        </CardTitle>
                        <p className="text-blue-300/60 text-center text-sm">Room: {room_uid}</p>
                    </CardHeader>
                    <CardContent>
                        {error && <ErrorMessage message={error} />}
                        <form onSubmit={handleStart} className="space-y-6">
                            <div className="relative group">
                                <User className="absolute left-3 top-3.5 h-5 w-5 text-blue-300/60 z-10" />
                                <input
                                    type="text"
                                    placeholder="Enter Team Name"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3.5 bg-[#0c1629]/70 border-2 border-blue-900/20 rounded-xl focus:outline-none focus:border-blue-500/30 text-blue-100 placeholder-blue-300/40 transition-all hover:border-blue-800/40"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={questions.length === 0}
                                className="w-full py-4 px-6 bg-gradient-to-br from-blue-600 via-blue-500 to-orange-600 text-white font-medium rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {questions.length === 0 ? "Loading Quiz..." : "Start Quiz"}
                            </button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (gameState === 'finished' || gameState === 'submitting') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0c1629] relative overflow-hidden p-4">
                <BackgroundEffects />
                <Card className="w-full max-w-md bg-[#1a2436]/90 border border-green-900/30 shadow-2xl backdrop-blur-xl relative z-10">
                    <CardContent className="pt-10 pb-10 flex flex-col items-center text-center space-y-6">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                            <Trophy className="w-10 h-10 text-green-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white">Quiz Submitted!</h2>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <div className="text-blue-200">
                            <p>Team: <span className="font-bold text-orange-400">{teamName}</span></p>
                            <p className="mt-2 text-sm text-blue-300/60">Wait for the auctioneer to announce results.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const currentQ = questions[currentQuestionIndex];
    if (!currentQ) return <div className="text-white">Loading...</div>;

    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const progressPercentage = (timeLeft / TIME_PER_QUESTION) * 100;
    
    let progressColor = "bg-blue-500";
    if (progressPercentage < 60) progressColor = "bg-yellow-500";
    if (progressPercentage < 30) progressColor = "bg-red-500";

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0c1629] relative overflow-hidden p-4">
            <BackgroundEffects />
            
            <Card className="w-full max-w-2xl bg-[#1a2436]/90 border border-blue-900/30 shadow-2xl backdrop-blur-xl relative z-10 min-h-[500px] flex flex-col">
                <div className="absolute top-0 left-0 w-full h-2 bg-blue-900/30 rounded-t-xl overflow-hidden">
                    <div 
                        className={`h-full ${progressColor} transition-all duration-100 ease-linear`}
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>

                <div className="flex justify-between items-center p-6 border-b border-blue-900/20 mt-2">
                     <div className="flex items-center gap-2 text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                        <Clock className="w-4 h-4" />
                        <span className="font-mono font-bold tracking-wider">{Math.ceil(timeLeft)}s</span>
                    </div>
                    <div className="text-blue-300/60 text-sm font-medium">
                        Question <span className="text-blue-100">{currentQuestionIndex + 1}</span> / {questions.length}
                    </div>
                </div>

                <CardContent className="flex-1 flex flex-col p-6 overflow-y-auto">
                    <h2 className="text-xl md:text-2xl font-semibold text-blue-50 mb-8 leading-relaxed">
                        {currentQ.question}
                    </h2>

                    <div className="grid gap-3 mb-6">
                        {currentQ.options && currentQ.options.map((opt, idx) => {
                            const isSelected = currentSelection === opt;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionSelect(opt)}
                                    className={`relative p-4 rounded-xl text-left transition-all border-2 group
                                        ${isSelected 
                                            ? 'bg-blue-600/20 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                                            : 'bg-[#0c1629]/50 border-blue-900/20 text-blue-200 hover:border-blue-700 hover:bg-[#0c1629]'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium pr-4">{opt}</span>
                                        {isSelected && <CheckCircle className="w-5 h-5 text-blue-400" />}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                    
                    {error && <ErrorMessage message={error} />}
                </CardContent>

                <div className="p-6 border-t border-blue-900/20 flex justify-end">
                    <button
                        onClick={handleNextOrSubmit}
                        className={`flex items-center gap-2 py-3 px-8 text-white font-medium rounded-xl transition-all shadow-lg
                        ${isLastQuestion 
                            ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]' 
                            : 'bg-blue-600 hover:bg-blue-500'}
                        `}
                    >
                        {isLastQuestion ? (
                            <>Submit Quiz <CheckCircle className="w-5 h-5" /></>
                        ) : (
                            <>Next Question <ArrowRight className="w-5 h-5" /></>
                        )}
                    </button>
                </div>
            </Card>
        </div>
    );
};

const BackgroundEffects = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-600 to-orange-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('/subtle-prism.svg')] opacity-10"></div>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 20}s infinite`
            }}
          ></div>
        ))}
    </div>
);

const ErrorMessage = ({ message }) => (
    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-900/20 p-3 rounded-lg border border-red-900/50 mb-4">
        <AlertCircle className="w-4 h-4 shrink-0" />
        <span>{message}</span>
    </div>
);

export default Quiz;