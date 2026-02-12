import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { PROD, HOST, makeRequest } from '../lib/utils'

function ParticipantsPage() {
  const [balance, setBalance] = useState(0);
  const [uid, setUID] = useState('')
  const [players, setPlayers] = useState({});
  const [boughtPlayers, setBoughtPlayers] = useState({});
  const [name, setName] = useState("");
  const [currPlayer, setCurrPlayer] = useState(null);
  const [socket, setSocket] = useState(null);

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
      if (socket != null && socket.current) socket.current.close();
    };
  }, []);

  useEffect(() => {
      if (socket == null) return;
    socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
  
          if (message.all_players !== undefined) {
            setPlayers(message.all_players);
            setBalance(message.balance);
            setBoughtPlayers(message.players);
            setName(message.name);
            setUID(message.uid)
  
            setCurrPlayer(message.all_players[message.curr_player]);
          }
  
          if (message.type === "curr_player") {
            setCurrPlayer(players[message.player_uid]);
          }
  
          if (message.type == "team_player" && uid == message.uid) {
            const prevPlayers = structuredClone(boughtPlayers);
            prevPlayers[message.entry_id] = {
              "price": message.price,
              "player_id": message.player
            }
            setBoughtPlayers(prevPlayers)
            setBalance(message.balance)
          }
  
          if (message.type == "revert_player" && uid == message.uid) {
            setBoughtPlayers(prevPlayers => {
              const newPlayers = { ...prevPlayers }
              setBalance(balance + newPlayers[message.entry_id].price)
              delete newPlayers[message.entry_id]
              return newPlayers
            })
          }
  
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
    }
  }, [
    socket,
    balance,
    players,
    boughtPlayers,
    name,
    currPlayer,
    uid,
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
      
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };


  return (
    <main className="pt-24 min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Participants</h1>
          <div className="bg-gray-800/60 rounded-lg px-4 py-2 backdrop-blur-sm">
            Available Balance: ₹{balance} L
          </div>
        </div>

        <div className="flex flex-col items-center justify-center ">
          {/* Current Player */}
          {currPlayer ?
            <>
              <img src={`/cricketers/${currPlayer.order}.jpg`} className="w-full md:w-2/3 mb-5 rounded-md h-full object-cover mx-auto " alt="Current Player" />
              <p className='text-center text-white text-2xl mb-4'>Base Price: { currPlayer.base_price }</p>
            </>
            : <></>
          }
  
          {/* List of Players Bought */}
          <div className="md:col-span-2 bg-gray-900/40 rounded-lg p-6 backdrop-blur-sm border border-gray-800">
            <h2 className="text-2xl font-semibold mb-4">List of players bought by {name}</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-3 px-4">S.no</th>
                    <th className="text-left py-3 px-4">Player Name</th>
                    <th className="text-left py-3 px-4">Domain</th>
                    <th className="text-left py-3 px-4">Country</th>
                    <th className="text-left py-3 px-4">Bought at Price</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(boughtPlayers ?? {}).map((player, index) => {
                    const playerDetails = players[boughtPlayers[player].player_id];

                    return (
                      <tr key={player} className="border-b border-gray-800">
                        <td className="py-3 px-4">{index + 1}</td>
                        <td className="py-3 px-4">{playerDetails ? playerDetails.name : "Unknown"}</td>
                        <td className="py-3 px-4">{playerDetails ? playerDetails.domain : "Unknown"}</td>
                        <td className="py-3 px-4">
                          {playerDetails ? (playerDetails.is_domestic ? "Domestic" : "International") : "Unknown"}
                        </td>
                        <td className="py-3 px-4">₹{boughtPlayers[player].price} L</td>
                      </tr>
                    );
                  })}
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