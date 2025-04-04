import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Sudoku from "@/components/Sudoku";
import PlayerList from "@/components/PlayerList";
import { HOST } from "@/utils/constants";

const Game = () => {
  const { roomId } = useParams();
  const [gameSettings, setGameSetting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const fetchSudoku = async () => {
      try {
        const response = await fetch(`${HOST}/api/lobbies?name=${roomId}`, {
          method: "GET",
        });
        const data = await response.json();

        if (data.status === 500) return;

        setGameSetting(data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSudoku();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen bg-slate-900 ">
      {!loading && gameSettings === null && <div className="text-gray-300 text-xl">Game does not exist!!!</div>}

      {gameSettings && <PlayerList />}
      {isStarted && <Sudoku />}

      {gameSettings && (
        <div className="flex flex-col items-center w-[320px] md:w-[400px] mt-8 py-1 border-1 border-amber-500 rounded-sm">
          <h3 className="text-gray-300 text-xl">Game Settings</h3>
          <div className="py-1">
            <p className="text-gray-300">Difficulty: {gameSettings.difficulty}</p>
            <p className="text-gray-300">Game Mode: {gameSettings.gameMode}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
