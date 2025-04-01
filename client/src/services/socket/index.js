import { io } from "socket.io-client";
import { HOST } from "@/utils/constants";
import { SOCKET_EVENTS } from "./events";

let socket;

const initSocket = (username) => {
  socket = io(HOST, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on(SOCKET_EVENTS.CONNECT, () => {
    console.log("Connected to server with ID:", socket.id);

    if (username) {
      setUsername(username);
    }
  });

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err.message);
  });

  socket.on(SOCKET_EVENTS.DISCONNECT, () => {
    console.log("Disconnected:");
  });

  return socket;
};

// Get the socket or initialize if it doesn't exist
const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};

// Cleanup
const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

// Set username for current socket
const setUsername = (username) => {
  if (socket && username) {
    socket.emit("setUsername", username);
    return true;
  }
  return false;
};

export { initSocket, getSocket, disconnectSocket, setUsername };
