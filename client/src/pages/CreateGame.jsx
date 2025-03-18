import { useState } from "react";

const CreateGame = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [isPublic, setIsPublic] = useState(false);

  return (
    <div className="flex items-center flex-col h-screen bg-slate-900">
      <h1 className="text-gray-300 text-4xl py-4">Create Game</h1>
      <h2 className="text-gray-300 text-xl pb-4">Difficulty</h2>
      <div className="flex flex-wrap gap-4">
        <button
          className={`${difficulty === "easy" && "bg-amber-500"} ${
            difficulty === "easy" ? "text-slate-900" : "text-amber-500"
          } font-semibold px-4 py-2 border-1 border-amber-500 rounded-sm cursor-pointer`}
          onClick={() => setDifficulty("easy")}
        >
          Easy
        </button>
        <button
          className={`${difficulty === "medium" && "bg-amber-500"} ${
            difficulty === "medium" ? "text-slate-900" : "text-amber-500"
          } font-semibold px-4 py-2 border-1 border-amber-500 rounded-sm cursor-pointer`}
          onClick={() => setDifficulty("medium")}
        >
          Medium
        </button>
        <button
          className={`${difficulty === "hard" && "bg-amber-500"} ${
            difficulty === "hard" ? "text-slate-900" : "text-amber-500"
          } font-semibold px-4 py-2 border-1 border-amber-500 rounded-sm cursor-pointer`}
          onClick={() => setDifficulty("hard")}
        >
          Hard
        </button>
        <button
          className={`${difficulty === "extreme" && "bg-amber-500"} ${
            difficulty === "extreme" ? "text-slate-900" : "text-amber-500"
          } font-semibold px-4 py-2 border-1 border-amber-500 rounded-sm cursor-pointer`}
          onClick={() => setDifficulty("extreme")}
        >
          Extreme
        </button>
      </div>

      <h2 className="text-gray-300 text-xl py-4">Game Visibility</h2>
      <div className="flex gap-4">
        <button
          className={`${isPublic && "bg-amber-500"} ${
            isPublic ? "text-slate-900" : "text-amber-500"
          } font-semibold px-4 py-2 border-1 border-amber-500 rounded-sm cursor-pointer`}
          onClick={() => setIsPublic(true)}
        >
          Public
        </button>
        <button
          className={`${!isPublic && "bg-amber-500"} ${
            !isPublic ? "text-slate-900" : "text-amber-500"
          } font-semibold px-4 py-2 border-1 border-amber-500 rounded-sm cursor-pointer`}
          onClick={() => setIsPublic(false)}
        >
          Private
        </button>
      </div>
    </div>
  );
};

export default CreateGame;
