import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { SOCKET_EVENTS } from "../services/socket/events";

const useRoom = (initialRoom = "") => {
  const { socket, isConnected } = useContext(SocketContext);
  const [currentRoom, setCurrentRoom] = useState(initialRoom);
  const [roomUsers, setRoomUsers] = useState([]);

  // Join a room
  const joinRoom = (roomId) => {
    if (!socket || !isConnected || !roomId) return false;

    socket.emit(SOCKET_EVENTS.JOIN_ROOM, roomId);
    setCurrentRoom(roomId);
    return true;
  };

  // Leave room
  const leaveRoom = () => {
    if (!socket || !isConnected || !currentRoom) return false;

    socket.emit(SOCKET_EVENTS.LEAVE_ROOM, currentRoom);
    setCurrentRoom("");
    return true;
  };

  // Get room users
  const fetchRoomUsers = () => {
    if (!socket || !isConnected || !currentRoom) return;

    socket.emit("getRoomUsers", currentRoom);
  };

  useEffect(() => {
    if (!socket) return;

    // Setup room event listeners
    const onUserJoined = (data) => {
      console.log(`User ${data.username} (${data.userId}) joined room ${data.roomId}`);
      fetchRoomUsers();
    };

    const onUserLeft = (data) => {
      console.log(`User ${data.username} (${data.userId}) left room ${data.roomId}`);
      fetchRoomUsers();
    };

    const onRoomUsers = (data) => {
      if (data.roomId === currentRoom) {
        setRoomUsers(data.users);
      }
    };

    // Register event listeners
    socket.on(SOCKET_EVENTS.USER_JOINED, onUserJoined);
    socket.on(SOCKET_EVENTS.USER_LEFT, onUserLeft);
    socket.on("roomUsers", onRoomUsers);

    // Initial join room if provided
    if (initialRoom && isConnected) {
      joinRoom(initialRoom);
    }

    // Get users when joining a room
    if (currentRoom) {
      fetchRoomUsers();
    }

    // Cleanup
    return () => {
      socket.off(SOCKET_EVENTS.USER_JOINED, onUserJoined);
      socket.off(SOCKET_EVENTS.USER_LEFT, onUserLeft);
      socket.off("roomUsers", onRoomUsers);

      // Leave room on component unmount
      if (currentRoom) {
        socket.emit(SOCKET_EVENTS.LEAVE_ROOM, currentRoom);
      }
    };
  }, [socket, isConnected, currentRoom, initialRoom]);

  return {
    currentRoom,
    roomUsers,
    joinRoom,
    leaveRoom,
    fetchRoomUsers,
  };
};

export { useRoom };
