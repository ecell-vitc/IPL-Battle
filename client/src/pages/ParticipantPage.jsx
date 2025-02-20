import React from 'react';

function ParticipantsPage() {
  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Participants</h1>
          <div className="bg-gray-800/60 rounded-lg px-4 py-2 backdrop-blur-sm">
            Available Balance: [Amount]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Player Image Section */}
          <div className="bg-gray-900/40 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 text-center px-4">
                Current player auctioning poster
              </p>
            </div>
          </div>

          {/* Player List Section */}
          <div className="md:col-span-2 bg-gray-900/40 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
            <h2 className="text-2xl font-semibold mb-4">List of players bought by the team</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4">S.no</th>
                    <th className="text-left py-3 px-4">Player name</th>
                    <th className="text-left py-3 px-4">Domain</th>
                    <th className="text-left py-3 px-4">Country</th>
                    <th className="text-left py-3 px-4">Bought at price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-3 px-4">1</td>
                    <td className="py-3 px-4">Xyz player</td>
                    <td className="py-3 px-4">Baller/Batsman<br/>all rounder<br/>wicketkeeper</td>
                    <td className="py-3 px-4">Domestic<br/>Foreign</td>
                    <td className="py-3 px-4">₹xxxx</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ParticipantsPage;