import { Spotlight } from "@/components/ui/spotlight-new";

import { 
  Users, User, 
  Trophy, 
  TrendingUp,
  Zap,
} from 'lucide-react';

import GameRules from '@/components/flow';


const Home = () => {

  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      <Spotlight />

      <div className="absolute inset-0 opacity-10 [mask-image:linear-gradient(to_bottom,transparent,black)]">
        <div className="absolute inset-0 bg-[url('https://assets-global.website-files.com/6450b31696e25f8aa6cdd7b0/6450b31696e25f2b65cdd7e8_Grid.svg')] bg-[size:60px] animate-grid-pulse" />
      </div>

      <div className="absolute inset-0 opacity-20 animate-particle-flow">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="absolute w-0.5 h-0.5 bg-green-400 rounded-full" />
        ))}
      </div>

     

      {/* Hero Section */}
      <main className="relative pt-40 pb-24 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="space-y-8 max-w-6xl mx-auto">
            
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-none relative w-full md:w-1/2 flex justify-center md:justify-start">
                <div className="relative">
                  
                  <img 
                    src="/IPL-Logo.png"
                    alt="IPL 2024"
                    className="w-56 h-56 md:w-64 md:h-64 object-contain animate-float"
                  />
                  <h1 className="text-6xl font-extrabold">
                    <span className="relative inline-block">
                      <span className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 blur-lg opacity-5 "></span>
                      <span className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                        Battle 6.0
                      </span>
                    </span>
                  </h1>
              </div>
            </div>

            <div className="flex-1 text-left space-y-6 pl-0 md:pl-8">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Build Your Dream Cricket Team 
              </h2>
                
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              Join the ultimate cricket auction experience and prove your team management skills
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <Trophy className="w-8 h-8 text-amber-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">₹ 25,000</h3>
                    <p className="text-gray-400 text-sm">Prize Pool</p> 
                  </div>
                </div>
                
                <div className="row-span-2 bg-gray-900/50 rounded-xl border border-gray-800">
                  <div className="flex items-center space-x-4 py-3 px-4">
                    <User className="w-8 h-8 text-green-400" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">₹150</h3>
                      <p className="text-gray-400 text-sm">Single</p> 
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 py-3 px-4">
                    <Users className="w-8 h-8 text-green-400" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">₹250</h3>
                      <p className="text-gray-400 text-sm">Duo</p> 
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 py-3 px-4">
                    <Users className="w-8 h-8 text-green-400" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">₹300</h3>
                      <p className="text-gray-400 text-sm">Trio</p> 
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                  <TrendingUp className="w-8 h-8 text-cyan-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">Live Auction</h3>
                    <p className="text-gray-400 text-sm">Real-time updates</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <GameRules/>

      </main>
    </div>

  );
};

export default Home;
