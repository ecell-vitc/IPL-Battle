import { useState, useEffect } from "react"
import Banner from "../components/banner"
import { makeRequest } from "../lib/utils"
import { ArrowLeft, ArrowRight } from "lucide-react"

const Players = () => {
    const [players, setPlayers] = useState([])
    const [curr, setCurr] = useState(null)

    useEffect(() => {
        makeRequest("/players/", "GET")
            .then(data => {
                setPlayers(data)
                for (let key in data)
                    if (data[key].prev === null) {
                        setCurr(key)
                        break
                    }
            })
    }, [])

    return (
        <main className="min-h-screen mx-auto lg:w-3/4 pt-12 flex flex-col flex-wrap justify-center content-center px-5 text-white">
            {curr ? <Banner {...players[curr]} /> : <></>}
            <div className="inline-flex gap-5 mx-auto">
                <button
                    className="p-2 disabled:opacity-20 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
                    disabled={players[curr]?.prev == null}
                    onClick={() => setCurr(players[curr].prev)}>
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                    className="p-2 disabled:opacity-20 bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors"
                    disabled={players[curr]?.next == null}
                    onClick={() => setCurr(players[curr].next)}>
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>
        </main>
    )
}

export default Players


