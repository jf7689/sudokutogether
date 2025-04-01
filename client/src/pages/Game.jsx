import { useState } from "react";
import Sudoku from "@/components/Sudoku";
import PlayerList from "@/components/PlayerList";
import { useLocation } from "react-router";

const Game = () => {
  const location = useLocation();
  const gameSettings = location.state;
  const [isStarted, setIsStarted] = useState(false);
  return (
    <div className="flex flex-col items-center h-screen bg-slate-900 ">
      <PlayerList />
      {isStarted && <Sudoku />}

      <div className="flex flex-col items-center w-[320px] md:w-[400px] mt-8 py-1 border-1 border-amber-500 rounded-sm">
        <h3 className="text-gray-300 text-xl">Game Settings</h3>
        <div className="py-1">
          <p className="text-gray-300">Difficulty: {gameSettings.difficulty}</p>
          <p className="text-gray-300">Game Mode: {gameSettings.gameMode}</p>
        </div>
      </div>
    </div>
  );
};

export default Game;
