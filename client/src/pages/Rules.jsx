import React from 'react';

function Rules() {
  return (
    <>
      <main className="pt-24 min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Rules</h1>

          {/* General Rules Section */}
          <div className="bg-[#1B2A4E]/40 rounded-lg p-6 mb-8 backdrop-blur-sm border border-[#2C365E]">
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Every participant must be a part of ONLY 1 team. Violation of this rule will lead to the disqualification of both teams.
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                All participants must be present for the entire duration of the event.
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                In case of any discrepancy, the decision of the auctioneer stands final.
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Bidding must be carried out in a disciplined manner, with no unnecessary commotion or disruptions.
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Failure to satisfy the rules will lead to disqualification of the team.
              </li>
            </ul>
          </div>

          {/* Round 1 Section */}
          <div className="bg-[#1B2A4E]/40 rounded-lg p-6 mb-8 backdrop-blur-sm border border-[#2C365E]">
            <h2 className="text-2xl font-semibold mb-4">Round 1</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                The participants will attempt a total of 30 MCQs (Multiple Choice Questions) within 15 minutes.
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Navigating out of the portal will lead to the disqualification of the team.
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                The marking scheme is +1 for every correct answer with no negative markings involved.
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                The team with most points will get to select their desired IPL team that they will bid for, then the team with second points, and so forth.
              </li>
            </ul>
          </div>

          {/* Round 2 Section */}
          <div className="bg-[#1B2A4E]/40 rounded-lg p-6 mb-8 backdrop-blur-sm border border-[#2C365E]">
            <h2 className="text-2xl font-semibold mb-4">Round 2</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                A budget of 70 crores will be allotted to every team.
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                A team must buy a minimum of 16 players and a maximum of 18 players.
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Each bid will begin with a fixed minimum price according to the player's value.
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                There will be no upper limit on the bidding of any player.
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Any team exceeding the allowed digital amount will not be permitted to participate in the bidding process.
              </li>
              <li>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  The team should consist of at least:
                </div>
                <div className="mt-2 ml-4">
                  <div>• Wicket Keepers: 2</div>
                  <div>• Batsman: 3</div>
                  <div>• All-rounders: 3</div>
                  <div>• Bowlers: 4</div>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                The team should have a maximum of 7 foreign players.
              </li>
            </ul>
          </div>

          {/* Round 3 Section */}
          <div className="bg-[#1B2A4E]/40 rounded-lg p-6 backdrop-blur-sm border border-[#2C365E]">
            <h2 className="text-2xl font-semibold mb-4">Round 3</h2>
            <ul className="space-y-3">
              <li>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  Each team should make their playing 11 from the players chosen in Round 2 according to the following criteria:
                </div>
                <div className="mt-2 ml-4">
                  <div>• At most 5 foreign players</div>
                  <div>• At least 2 all-rounder</div>
                  <div>• At least 1 Wicket Keeper</div>
                  <div>• At least 3 Bowlers</div>
                  <div>• At least 3 batsmen</div>
                </div>
              </li>
              <li>
                <div className="flex items-start">
                  <span className="mr-2">•</span>
                  Evaluation criteria:
                </div>
                <div className="mt-2 ml-4">
                  <div>• The sum of playing 11 players' individual ratings will be calculated.</div>
                  <div>• In case of a tie, the remaining balance will be taken into consideration.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
      {/* Add Footer component here */}
    </>
  );
}

export default Rules;