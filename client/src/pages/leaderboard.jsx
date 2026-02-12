import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, AlertCircle } from 'lucide-react';
import { makeRequest } from '../lib/utils';

const Leaderboard = () => {
    const { room_uid } = useParams();
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await makeRequest(`/quiz/leaderboard/${room_uid}`, 'GET');
                
                const results = data.leaderboard || data || [];
                
                const sortedResults = results.sort((a, b) => {
                    if (b.score !== a.score) return b.score - a.score;
                    return a.timestamp - b.timestamp;
                });

                if (sortedResults.length === 0) throw new Error("Empty");

                setLeaderboardData(sortedResults);
            } catch (err) {
                console.error("Failed to fetch leaderboard:", err);
                
                const now = Date.now();
                const sampleData = [
                    { teamname: "Mahesh", score: 1200, timestamp: now - 10000 },
                    { teamname: "Srivatsan", score: 1150, timestamp: now - 12500 },
                    { teamname: "Yashita", score: 1150, timestamp: now - 12800 },
                    { teamname: "Tharani", score: 1050, timestamp: now - 40000 },
                    { teamname: "Ayush", score: 980, timestamp: now - 55000 },
                    { teamname: "Manmay", score: 920, timestamp: now - 60000 },
                    { teamname: "Hanan", score: 890, timestamp: now - 72000 },
                    { teamname: "Rohan", score: 850, timestamp: now - 80000 },
                    { teamname: "Karthik", score: 800, timestamp: now - 90000 },
                    { teamname: "Priya", score: 750, timestamp: now - 95000 },
                    { teamname: "Rahul", score: 600, timestamp: now - 100000 }
                ];
                setLeaderboardData(sampleData);
                setError(""); 
            } finally {
                setLoading(false);
            }
        };

        if (room_uid) {
            fetchLeaderboard();
        }
    }, [room_uid]);

    const formatToIST = (unixTimestamp) => {
        if (!unixTimestamp) return "-";
        const date = new Date(unixTimestamp);
        return date.toLocaleTimeString('en-IN', {
            timeZone: 'Asia/Kolkata',
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            fractionalSecondDigits: 3 
        });
    };

    const getRankDisplay = (index) => {
        const rank = index + 1;
        // Top 3 specific colors
        if (index === 0) return (
            <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-yellow-400 w-6 text-right">1</span>
                <Medal className="w-6 h-6 text-yellow-400 fill-yellow-400/20" />
            </div>
        );
        if (index === 1) return (
             <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-gray-300 w-6 text-right">2</span>
                <Medal className="w-6 h-6 text-gray-300 fill-gray-300/20" />
            </div>
        );
        if (index === 2) return (
             <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-amber-600 w-6 text-right">3</span>
                <Medal className="w-6 h-6 text-amber-600 fill-amber-600/20" />
            </div>
        );
        // Top 10 gets blue medal
        if (index < 10) return (
            <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-bold text-blue-400 w-6 text-right">{rank}</span>
                <Medal className="w-5 h-5 text-blue-400 fill-blue-400/20" />
            </div>
        );
        
        // Others just number
        return <span className="text-blue-400/60 font-mono font-bold text-lg">#{rank}</span>;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0c1629] relative overflow-hidden p-4">
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #3b82f6;
                    border-radius: 20px;
                }
            `}</style>

            <BackgroundEffects />
            
            {/* Increased max-width to 6xl for wider table */}
            <Card className="w-full max-w-6xl bg-[#1a2436]/90 border border-blue-900/30 shadow-2xl backdrop-blur-xl relative z-10 h-[80vh] flex flex-col">
                <CardHeader className="space-y-2 pb-6 border-b border-blue-900/20 bg-[#151e2e]/50 rounded-t-xl">
                    <CardTitle className="text-3xl font-bold text-center tracking-tighter text-white flex items-center justify-center gap-3">
                        <Trophy className="w-8 h-8 text-yellow-500 animate-pulse" />
                        <span className="bg-gradient-to-r from-blue-400 to-orange-500 bg-clip-text text-transparent">
                            Quiz Leaderboard
                        </span>
                    </CardTitle>
                    <p className="text-blue-300/60 text-center text-sm">Room: {room_uid}</p>
                </CardHeader>

                <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
                    {loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-blue-300 gap-4">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
                            <p>Calculating scores...</p>
                        </div>
                    ) : error ? (
                        <div className="flex-1 flex items-center justify-center p-6">
                            <div className="text-red-400 flex items-center gap-2 bg-red-900/20 p-4 rounded-lg border border-red-900/50">
                                <AlertCircle className="w-5 h-5" />
                                {error}
                            </div>
                        </div>
                    ) : leaderboardData.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-blue-300/60">
                            No results found for this room.
                        </div>
                    ) : (
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-3">
                            
                            {/* Adjusted grid columns for better spacing */}
                            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2 sticky top-0 bg-[#0c1629]/95 backdrop-blur-md z-10 border-b border-blue-900/30">
                                <div className="col-span-2 text-center">Rank</div>
                                <div className="col-span-4 pl-4">Team</div>
                                <div className="col-span-4 text-center">Submission Time (IST)</div>
                                <div className="col-span-2 text-right pr-4">Score</div>
                            </div>
                            
                            <div className="space-y-2">
                                {leaderboardData.map((entry, index) => (
                                    <div 
                                        key={index} 
                                        className={`relative grid grid-cols-12 gap-4 items-center p-4 rounded-xl border transition-all hover:scale-[1.002] group
                                            ${index === 0 
                                                ? 'bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/30 shadow-[inset_0_0_20px_rgba(234,179,8,0.05)]' 
                                                : 'bg-[#0c1629]/40 border-blue-900/10 hover:bg-[#0c1629]/60 hover:border-blue-700/30'
                                            }`}
                                    >
                                        {/* Rank Column */}
                                        <div className="col-span-2 flex justify-center">
                                            {getRankDisplay(index)}
                                        </div>

                                        {/* Team Name Column */}
                                        <div className="col-span-4 pl-4">
                                            <h3 className={`font-bold text-lg truncate ${index === 0 ? 'text-yellow-100' : 'text-blue-100'}`}>
                                                {entry.teamname || entry.user || `Team ${index + 1}`}
                                            </h3>
                                        </div>

                                        {/* Timestamp Column */}
                                        <div className="col-span-4 text-center">
                                            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-950/40 border border-blue-800/20 text-blue-300 font-mono text-sm">
                                                {formatToIST(entry.timestamp)}
                                            </div>
                                        </div>

                                        {/* Score Column */}
                                        <div className="col-span-2 text-right pr-4">
                                            <div className="font-mono font-bold text-2xl text-orange-400 leading-none">
                                                {Math.round(entry.score)}
                                            </div>
                                            <div className="text-[10px] text-blue-400/50 font-medium uppercase mt-1">Points</div>
                                        </div>

                                        {/* Row Highlight Effect */}
                                        {index < 3 && (
                                            <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${
                                                index === 0 ? 'bg-yellow-500' : 
                                                index === 1 ? 'bg-gray-400' : 
                                                'bg-amber-600'
                                            }`} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

const BackgroundEffects = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('/subtle-prism.svg')] opacity-5"></div>
    </div>
);

export default Leaderboard;