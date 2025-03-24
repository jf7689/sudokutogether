import { io } from "socket.io-client";
import { HOST } from "@/utils/constants";

let socket;

const initSocket = () => {
  socket = io(HOST, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("Connected to server with ID:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err.message);
  });

  socket.on("disconnect", () => {
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

export { initSocket, getSocket, disconnectSocket };
