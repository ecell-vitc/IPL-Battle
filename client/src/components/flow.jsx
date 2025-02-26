import React from 'react';
import { Timer, Users, DollarSign, Award, ArrowDown, Shield, AlertCircle,HandCoins } from 'lucide-react';

const GameRules = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      {/* Section Title */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 text-transparent bg-clip-text mb-4">
          Flow of Game
        </h2>
        <p className="text-gray-400">Your journey to cricket management mastery</p>
      </div>

      {/* Round 1 Card */}
      <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 mb-8 text-center relative">
        <h3 className="text-3xl font-bold text-orange-500 mb-4">Round 1</h3>
        <p className="text-gray-400 mb-6">Score highest to select your team first!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <div className="text-3xl font-bold text-yellow-400">15</div>
            <div className="text-white">MCQ's</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <div className="text-3xl font-bold text-yellow-400">+1</div>
            <div className="text-white">Mark per Correct</div>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <div className="text-3xl font-bold text-yellow-400">7</div>
            <div className="text-white">Minutes</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-8">
        <ArrowDown className="w-12 h-12 text-blue-400 animate-bounce" />
      </div>

      {/* Round 2 Card */}
      <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 mb-8">
        <h3 className="text-3xl font-bold text-orange-500 text-center mb-4">Round 2</h3>
        <p className="text-gray-400 text-center mb-8">The Bidding Round</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Rules Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-blue-400 mb-4">Rules of Game</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">
                  Budget: <span className="text-yellow-400">70 Crores</span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">
                  Players: <span className="text-yellow-400">16-18</span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">
                  Players are rated out of <span className="text-yellow-400">50</span>
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <HandCoins className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-300">
                Buy <span className="text-yellow-400 ">Star players</span> (+5 pts)
                </span>
              </div>
            </div>
          </div>

          {/* Requirements Section */}
          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-blue-400 mb-4">Qualifying Requirements</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <div className="text-2xl font-bold text-yellow-400">3</div>
                <div className="text-gray-400">Batsman</div>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <div className="text-2xl font-bold text-yellow-400">4</div>
                <div className="text-gray-400">Bowlers</div>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <div className="text-2xl font-bold text-yellow-400">3</div>
                <div className="text-gray-400">All-rounders</div>
              </div>
              <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <div className="text-2xl font-bold text-yellow-400">2</div>
                <div className="text-gray-400">Wicket Keepers</div>
              </div>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 text-center">
              <span className="text-gray-300">
                Maximum of <span className="text-yellow-400">7</span> foreign players
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-500 italic">
          Teams will be judged based on their top 16 players
        </div>
      </div>

      <div className="flex justify-center my-8">
        <ArrowDown className="w-12 h-12 text-blue-400 animate-bounce" />
      </div>

      {/* Round 3 Card */}
      <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 mb-16">
        <h3 className="text-3xl font-bold text-orange-500 text-center mb-2">Round 3</h3>
        <p className="text-gray-400 text-center mb-8">The Final Round</p>

        <div className="max-w-3xl mx-auto">
          <h4 className="text-xl font-semibold text-blue-400 mb-6 text-center">
            Make your Playing 11 as per below criteria:
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <span className="text-gray-300">
                At most <span className="text-yellow-400">5</span> foreign players
              </span>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <span className="text-gray-300">
                At least <span className="text-yellow-400">2</span> all-rounders
              </span>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <span className="text-gray-300">
                At least <span className="text-yellow-400">1</span> Wicket Keeper
              </span>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
              <span className="text-gray-300">
                At least <span className="text-yellow-400">3</span> Bowlers
              </span>
            </div>
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 md:col-span-2">
              <span className="text-gray-300">
                At least <span className="text-yellow-400">3</span> batsmen
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-semibold text-blue-400 mb-4 text-center">
              Evaluation criteria
            </h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-3 bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <span className="text-yellow-400">1.</span>
                <span>
                  The sum of playing 11 players' individual ratings will be calculated.
                </span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
                <span className="text-yellow-400">2.</span>
                <span>
                  In case of a tie, the remaining balance will be taken into consideration.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code of Conduct Section */}
      <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
        Code of Conduct
      </h2>

      <div className="space-y-4">
        {[
          "Every participant must be a part of ONLY 1 team. Violation of this rule will lead to the disqualification of both teams.",
          "All participants must be present for the entire duration of the event.",
          "In case of any discrepancy, the decision of the auctioneer stands final.",
          "Bidding must be carried out in a disciplined manner, with no unnecessary commotion or disruptions.",
          "Failure to satisfy the rules will lead to disqualification of the team.",
          "Disputes with the auctioneer or co-auctioneer are not permitted. A single warning will be issued; further violations may result in disqualification."
        ].map((rule, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 transform transition-all duration-300 hover:bg-gray-800/50 text-left"
          >
            <Shield className="w-6 h-6 text-blue-400 flex-shrink-0" />
            <p className="text-gray-300 flex-1">
              <span className="text-blue-400 font-semibold">{index + 1}. </span>
              {rule}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center space-x-2 text-yellow-400">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">Please read and understand all rules carefully before participating</p>
        </div> 
      </div>
    </div>
  );
};

export default GameRules;
