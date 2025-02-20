import React from 'react';

function AdminPage() {
  const teams = Array.from({ length: 10 }, (_, i) => `Team ${i + 1}`);

  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Admin</h1>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {teams.map((team) => (
            <button
              key={team}
              className="aspect-square bg-gray-900/40 rounded-lg p-6 backdrop-blur-sm border border-gray-800 hover:bg-gray-800/60 transition-colors flex items-center justify-center"
            >
              <span className="text-xl font-semibold">{team}</span>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

export default AdminPage;