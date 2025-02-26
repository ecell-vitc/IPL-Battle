import React from 'react';

function Rules() {
  return (
    <>
      <main className="pt-24 min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12">Rules</h1>

          {/* General Rules */}
          <div className="bg-[#1B2A4E]/40 rounded-lg p-6 mb-8 backdrop-blur-sm border border-[#2C365E]">
            <h2 className="text-2xl font-semibold mb-4">General Rules</h2>
            <ul className="space-y-3">
              <li> 1. Every participant must be a part of ONLY 1 team. Violation of this rule will lead to the disqualification of both teams. </li>
              <li> 2. All participants must be present for the entire duration of the event. </li>
              <li> 3. In case of any discrepancy, the decision of the auctioneer stands final. </li>
              <li> 4. Bidding must be carried out in a disciplined manner, with no unnecessary commotion or disruptions. </li>
              <li> 5. Failure to satisfy the rules will lead to disqualification of the team. </li>
              <li> 6. Disputes with the auctioneer or co-auctioneer are not permitted. A single warning will be issued; further violations may result in disqualification. </li>
            </ul>
          </div>

          {/* Round 1 */}
          <div className="bg-[#1B2A4E]/40 rounded-lg p-6 mb-8 backdrop-blur-sm border border-[#2C365E]">
            <h2 className="text-2xl font-semibold mb-4">Round 1: Qualifier</h2>
            <ul className="space-y-3">
              <li>1. The participants will attempt a total of 15 MCQs (Multiple Choice Questions) within 7 minutes. </li>
              <li>2. Navigating out of the portal will lead to the disqualification of the team. </li>
              <li>3. The marking scheme is +1 for every correct answer with no negative markings involved. </li>
              <li>4. The team with most points will get to select their desired IPL team that they will bid for, then the team with second points, and so forth. </li>
            </ul>
          </div>

          {/* Round 2 */}
          <div className="bg-[#1B2A4E]/40 rounded-lg p-6 mb-8 backdrop-blur-sm border border-[#2C365E]">
            <h2 className="text-2xl font-semibold mb-4">Round 2: Auction</h2>
            <ul className="space-y-3">
            <li>1. A budget of 70 crores will be allotted to every team.</li>
            <li>2. A team must buy a minimum of 16 players and a maximum of 18 players.</li>
            <li>3. Each bid will begin with a fixed minimum price according to the player’s value.</li>
            <li>4. There will be no upper limit in the bidding of any player.</li>
            <li>5. Any team exceeding the allowed digital amount will not be permitted to participate in the bidding process.</li>
            <li>6. Players are rated out of 50. These ratings are fixed and will not be changed.</li>
            <li>7. There will be no reauctioning of any player in any case.</li>
            <li>8. The following are the team selection criteria for moving on to the next round:</li>
            <ul>
              <li>9. The team should consist of at least:
              <div className="ml-6 mt-2">
                <ul>
                  <li>1. Wicket Keepers: 2</li>
                  <li>2. Batsman: 3</li>
                  <li>3. All-rounders: 3</li>
                  <li>4. Bowlers: 4</li>
                </ul>
              </div>
              </li>
              
            </ul>
            <li>10. The team should have a maximum of 7 overseas players.</li>
            <li>11. Teams can gain additional points by buying star players (+5 points for every star player).</li>
            <li>12. All teams will be judged based on their top 16 players. From each auctioning room, the team with the maximum points will proceed to round 3. In case of a tie, the team with the maximum remaining balance amount will be selected.</li>
          </ul>

          </div>

          {/* Round 3 */}
          <div className="bg-[#1B2A4E]/40 rounded-lg p-6 backdrop-blur-sm border border-[#2C365E]">
            <h2 className="text-2xl font-semibold mb-4">Round 3: Finals</h2>
            <ul className="space-y-3">
            <li>1. Each team should make their playing 11 from the players chosen in Round 2 according to the following criteria:
              <div className="ml-6 mt-2">
            <ul>
              <li>1. At most 5 overseas players</li>
              <li>2. At least 2 all-rounders</li>
              <li>3. At least 1 Wicket Keeper</li>
              <li>4. At least 3 Bowlers</li>
              <li>5. At least 3 Batsmen</li>
            </ul>
            </div>
          </li>
          <li>2. Evaluation criteria:
          <div className="ml-6 mt-2">

            <ul>
              <li>1. The sum of playing 11 players' individual ratings will be calculated.</li>
              <li>2. In case of a tie, the remaining balance will be taken into consideration.</li>
            </ul>
          </div>
          </li>
            </ul>
          </div>

        </div>
      </main>
    </>
  );
}

export default Rules;