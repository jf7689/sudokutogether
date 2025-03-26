import { useContext } from "react";
import { useParams } from "react-router";
import { SocketContext } from "@/context/SocketContext";
import { useRoom } from "@/hooks/useRoom";

const PlayerList = () => {
  const { roomId } = useParams();
  const { isConnected } = useContext(SocketContext);
  const { currentRoom, roomUsers, joinRoom, leaveRoom } = useRoom();

  return (
    <div className="flex flex-col items-center">
      <div className="text-amber-500">Players</div>
    </div>
  );
};

export default PlayerList;
