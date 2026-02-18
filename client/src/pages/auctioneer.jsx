import React from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


import { useParams } from 'react-router-dom';
import { HOST, PROD, makeRequest } from '../lib/utils';
import Banner from '../components/banner';

function AuctioneerPage() {
  const [players, setPlayers] = useState({});
  const [currPlayer, setCurrPlayer] = useState(null);
  const [socket, setSocket] = useState(null)
  const [searchTerm, setSearchTerm] = useState("");
  const [participants, setParticipants] = useState({});
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [amount, setAmount] = useState('');

  const params = useParams()

  useEffect(() => {
    const storedRoomUid = params.room_id;
    const authToken = localStorage.getItem("token");

    if (storedRoomUid && authToken) {
      connectWebSocket(storedRoomUid, authToken);
    } else {
      console.error("room_uid or token not found in localStorage.");
    }

    return () => {
      if (socket != null && socket) socket.close();
    };
  }, []);

  // Update navigation states whenever currPlayer changes
  useEffect(() => {
    if (currPlayer) {
      setNext(players[currPlayer.next] ? currPlayer.next : null);
      setPrev(players[currPlayer.prev] ? currPlayer.prev : null);
    }
  }, [currPlayer, players]);


  useEffect(() => {
    if (socket == null) return;
    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        if (message.all_players !== undefined) {
          setPlayers(message.all_players);
          setCurrPlayer(message.all_players[message.curr_player]);
          setParticipants(message.participants);
        }

        if (message.type === "curr_player") {
          setCurrPlayer(players[message.player_uid]);
        }

        if (message.type === "team_player") {
          if (message.valid === false) return;

          setParticipants(prevParticipants => {
            const newParticipants = { ...prevParticipants };
            newParticipants[message.uid].players[message.entry_id] = {
              price: message.price,
              player_id: message.player
            };
            // Update the balance if the server sends the updated balance
            if (message.balance !== undefined) {
              newParticipants[message.uid].balance = message.balance;
            }
            return newParticipants;
          });
        }

        if (message.type === "revert_player") {
          setParticipants(prevParticipants => {
            const newParticipants = { ...prevParticipants };
            const team = newParticipants[message.uid];

            if (team.players[message.entry_id]) {
              const removedPlayerPrice = team.players[message.entry_id].price;
              newParticipants[message.uid].balance += removedPlayerPrice;
            }
                
              delete newParticipants[message.uid].players[message.entry_id];
            return newParticipants;
          });
        }

      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };
  }, [
    socket, 
    participants,
    currPlayer,
    players
  ])

  const connectWebSocket = (roomUid, authToken) => {
    const ws = new WebSocket(`${PROD ? 'wss' : 'ws'}://${HOST}/room/${roomUid}/`);
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      ws.send(JSON.stringify({ action: "AUTH", token: authToken }));
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
      setTimeout(() => {
        if (socket?.readyState === WebSocket.CLOSED) {
          connectWebSocket(roomUid, authToken);
        }
      }, 5000);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  const changePlayer = (isNext) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return;
    }

    const targetPid = isNext ? next : prev;
    if (targetPid) {
      socket.send(JSON.stringify({ action: "PLAYER", pid: targetPid }));
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleRemovePlayer = (entry_id) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return;
    }

    socket.send(JSON.stringify({
      action: "REVERT",
      entry_id: entry_id,
    }));
  };

  const handleAllocatePlayer = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN || !currPlayer || !amount) {
      return;
    }

    socket.send(JSON.stringify({
      action: "TEAM",
      uid: document.querySelector("input[name='curr_participant']:checked").value,
      amt: parseInt(amount),
    }));
    setAmount('');
  };

  const filteredTeams = Object.entries(participants).filter(([id, team]) => {
    if (!searchTerm) return true;
    return team.name?.toLowerCase().includes(searchTerm);
  });

  return (
    <main className="pt-24 min-h-screen relative overflow-hidden text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Auctioneer</h1>

        <div className="flex flex-col items-center justify-center ">
          {/* Current Player */}
          <Banner {...currPlayer} />
          <div className="flex justify-center space-x-4">
            <button
              disabled={!prev}
              onClick={() => changePlayer(false)}
              className="p-2 disabled:opacity-20 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button
              disabled={!next}
              onClick={() => changePlayer(true)}
              className="p-2 disabled:opacity-20 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
          <div className="mt-4 mb-6 flex space-x-5">
            <input
              type="number"
              placeholder="Amount (in Lakhs)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-800/60 rounded-lg py-2 pl-4 pr-10 backdrop-blur-sm border border-gray-700 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button
              onClick={handleAllocatePlayer}
              disabled={!amount || !currPlayer}
              className="p-2 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
            >
              Allocate
            </button>
          </div>
        </div>

        {/* Team Details Section */}
        <div className="md:col-span-2 bg-gray-900/40 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Team Details</h2>
            <input
              type="text"
              placeholder="Search teams..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-gray-800/60 rounded-lg py-2 px-4 backdrop-blur-sm border border-gray-700 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4">Select</th>
                  <th className="text-left py-3 px-4">S.no</th>
                  <th className="text-left py-3 px-4">Team Name</th>
                  <th className="text-left py-3 px-4">Balance</th>
                  <th className="text-left py-3 px-4">Players</th>
                </tr>
              </thead>
            </table>

            {Object.keys(participants).length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredTeams.map(([uid, team], index) => (
                  <AccordionItem value={uid} key={uid} className="border-b border-gray-800">
                    <AccordionTrigger className="w-full hover:no-underline">
                      <div className="w-full grid grid-cols-5 gap-4">
                        <div className="py-3 px-4 text-left"><input type="radio" name="curr_participant" value={uid} /></div>
                        <div className="py-3 px-4 text-left">{index + 1}</div>
                        <div className="py-3 px-4 text-left">{team.name}</div>
                        <div className="py-3 px-4 text-left">₹{team.balance} L</div>
                        <div className="py-3 px-4 text-left">{Object.keys(team.players || {}).length}</div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="px-4 py-3 bg-gray-800/30">
                        <h4 className="font-semibold mb-2">Team Players:</h4>
                        {team.players && Object.keys(team.players).length > 0 ? (
                          <ul className="space-y-2">
                            {Object.entries(team.players).map(([playerId, playerData]) => (
                              <li key={playerId} className="flex justify-between items-center">
                                <span>{players[playerData.player_id]?.name || "Unknown Player"}</span>
                                <div className="flex items-center">
                                  <span className="mr-4">₹{playerData.price} L</span>
                                  <button
                                    onClick={() => handleRemovePlayer(playerId)}
                                    className="p-1 hover:bg-red-600 rounded-full transition-colors"
                                    title="Remove player"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-400">No players in team</p>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-4 text-gray-400">
                No teams found
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default AuctioneerPage;