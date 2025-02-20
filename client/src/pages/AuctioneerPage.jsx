import React from 'react';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';

function AuctioneerPage() {
  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Auctioneer</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Player Image Section */}
          <div className="bg-gray-900/40 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
            <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <p className="text-gray-600 text-center px-4">
                Current player auctioning poster
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <button className="p-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button className="p-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors">
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Team Details Section */}
          <div className="md:col-span-2 bg-gray-900/40 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
            <h2 className="text-2xl font-semibold mb-4">Team Details</h2>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search team"
                className="w-full bg-gray-800/60 rounded-lg py-2 pl-4 pr-10 backdrop-blur-sm border border-gray-700 focus:outline-none focus:border-orange-500 transition-colors"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-xl">Team name</h3>
              <div className="bg-gray-800/60 rounded-lg px-4 py-2 backdrop-blur-sm">
                Available Balance: ₹70,00,00,000
              </div>
            </div>

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

export default AuctioneerPage;