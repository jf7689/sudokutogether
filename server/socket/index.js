import { Server } from "socket.io";
import env from "../config/env.js";
import { setupRoomHandlers } from "./handlers/roomHandler.js";

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [env.origin, "http://localhost:5174"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    setupRoomHandlers(io, socket);

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

export default setupSocket;
