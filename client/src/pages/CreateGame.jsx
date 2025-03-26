import { useState } from "react";
import { Link } from "react-router";

const CreateGame = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [isPublic, setIsPublic] = useState(false);

  const generateRoomId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-slate-900">
      <div className="flex flex-col items-center px-4 sm:px-0">
        <div>
          <h1 className="text-gray-300 text-4xl text-center py-4">Create Game</h1>
          <h2 className="text-gray-300 text-xl text-center pb-4">Difficulty</h2>
          <div className="flex flex-wrap gap-4">
            <button
              className={`${difficulty === "easy" && "bg-amber-500"} hover:bg-amber-500 ${
                difficulty === "easy" ? "text-slate-900" : "text-amber-500"
              } hover:text-slate-900 font-semibold px-4 py-2 border-1 border-amber-500 rounded-sm cursor-pointer`}
              onClick={() => setDifficulty("easy")}
            >
              Easy
            </button>
            <button
              className={`${difficulty === "medium" && "bg-amber-500"} hover:bg-amber-500 ${
                difficulty === "medium" ? "text-slate-900" : "text-amber-500"
              } hover:text-slate-900 font-semibold px-4 py-2 border-1 border-amber-500 rounded-sm cursor-pointer`}
              onClick={() => setDifficulty("medium")}
            >
              Medium
            </button>
            <button
              className={`${difficulty === "hard" && "bg-amber-500"} hover:bg-amber-500 ${
                difficulty === "hard" ? "text-slate-900" : "text-amber-500"
              } hover:text-slate-900 font-semibold px-4 py-2 border-1 border-amber-500 rounded-sm cursor-pointer`}
              onClick={() => setDifficulty("hard")}
            >
              Hard
            </button>
            <button
              className={`${difficulty === "extreme" && "bg-amber-500"} hover:bg-amber-500 ${
                difficulty === "extreme" ? "text-slate-900" : "text-amber-500"
              } hover:text-slate-900 font-semibold px-4 py-2 border-1 border-amber-500 rounded-sm cursor-pointer`}
              onClick={() => setDifficulty("extreme")}
            >
              Extreme
            </button>
          </div>

          <h2 className="text-gray-300 text-xl text-center py-4">Lobby Visibility</h2>
          <div className="flex gap-4">
            <button
              className={`${isPublic && "bg-amber-500"} hover:bg-amber-500 ${
                isPublic ? "text-slate-900" : "text-amber-500"
              } hover:text-slate-900 font-semibold px-4 py-2 border-1 border-amber-500 rounded-sm cursor-pointer`}
              onClick={() => setIsPublic(true)}
            >
              Public
            </button>
            <button
              className={`${!isPublic && "bg-amber-500"} hover:bg-amber-500 ${
                !isPublic ? "text-slate-900" : "text-amber-500"
              } hover:text-slate-900 font-semibold px-4 py-2 border-1 border-amber-500 rounded-sm cursor-pointer`}
              onClick={() => setIsPublic(false)}
            >
              Private
            </button>
          </div>
          <div className="flex justify-end mt-8">
            <Link
              to={`/${generateRoomId()}`}
              state={{ difficulty: difficulty }}
              className="bg-sky-500 hover:bg-sky-300 text-slate-900 font-semibold px-4 py-2 rounded-sm cursor-pointer"
            >
              Create
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGame;
