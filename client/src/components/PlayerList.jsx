import { useContext, useState } from "react";
import { useParams } from "react-router";
import { SocketContext } from "@/context/SocketContext";
import { useRoom } from "@/hooks/useRoom";

const PlayerList = () => {
  const { roomId } = useParams();
  const { username, updateUsername } = useContext(SocketContext);
  const { currentRoom, roomUsers, joinRoom } = useRoom();
  const [inputUsername, setInputUsername] = useState(username || "");
  const [error, setError] = useState("");

  const handleJoinRoom = () => {
    if (!inputUsername) {
      setError("Missing username");
      return;
    }
    setError("");
    updateUsername(inputUsername.trim());
    joinRoom(roomId);
  };

  return (
    <div className="flex flex-col items-center">
      {currentRoom !== roomId && (
        <div className="flex flex-col">
          <div className="text-gray-300">Username</div>
          <div className="text-red-500 text-sm">{error}</div>
          <div className="flex gap-4 mt-1">
            <input
              className="w-full text-gray-300 text-lg px-2 border-1 border-gray-300 outline-0 rounded-sm"
              type="text"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              placeholder="Name"
            />
            <button
              className="bg-sky-500 hover:bg-sky-300 text-slate-900 font-semibold px-4 py-1 outline-0 rounded-sm cursor-pointer"
              onClick={handleJoinRoom}
            >
              Join
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-1 w-[320px] mt-4 py-2 border-1 border-amber-500 rounded-sm">
        <h3 className="text-gray-300 text-xl text-center">Players</h3>
        {roomUsers.map((user) => {
          return (
            <div key={user.userId} className="text-gray-300 text-lg ml-2">
              {user.username}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerList;
