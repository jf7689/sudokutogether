import { useState } from "react";
import Sudoku from "@/components/Sudoku";
import PlayerList from "@/components/PlayerList";
import { useLocation } from "react-router";

const Game = () => {
  const location = useLocation();
  const gameSettings = location.state;
  const [isStarted, setIsStarted] = useState(true);
  return (
    <div className="flex flex-col items-center h-screen bg-slate-900">
      {console.log("Game Settings:", gameSettings)}
      {isStarted ? <Sudoku /> : <PlayerList />}
      <div className="flex flex-col items-center bg-slate-800 w-screen mt-8">
        <h3 className="text-gray-300 text-xl">Game Settings</h3>
        <div>
          <p className="text-gray-300">Difficulty: {gameSettings.difficulty}</p>
          <p className="text-gray-300">Mode: Classic</p>
        </div>
      </div>
    </div>
  );
};

export default Game;
