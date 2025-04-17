import puzzles from "../../controllers/puzzles.js";
import supabase from "../config/supabaseClient.js";

const setupRoomHandlers = (io, socket, roomManager) => {
  // Store username in socket object
  socket.on("setUsername", (username) => {
    socket.data.username = username;
    console.log(`User ${socket.id} set username to: ${username}`);
  });

  // Create a room
  socket.on("createRoom", (roomId, difficulty, gameMode, visibility) => {
    let gameState = {};
    if (roomId) {
      gameState = roomManager.createRoom(roomId, {
        puzzle: generatePuzzle(difficulty),
        ownerUsername: "",
        players: {},
        difficulty,
        gameMode,
        visibility,
        gameStarted: false,
      });
    }
    console.log(`Room with id: ${roomId} was created`);

    // Send game state room creator
    socket.emit("gameState", gameState);
  });

  // Join a room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.data.username || socket.id} joined room: ${roomId}`);

    // Get game state for this room
    let gameState = roomManager.getRoom(roomId);

    // Set inital owner
    if (gameState.ownerUsername === "") {
      gameState.ownerUsername = socket.data.username;
    }

    // Add player to the game state
    gameState.players[socket.id] = {
      userId: socket.id,
      username: socket.data.username,
    };

    // Notify room that a new user joined
    socket.to(roomId).emit("userJoined", {
      userId: socket.id,
      username: socket.data.username,
      roomId: roomId,
    });

    // Send game state to joining player
    socket.emit("gameState", gameState);
  });

  // Leave a room
  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.data.username || socket.id} left room: ${roomId}`);

    // Update game state
    const gameState = roomManager.getRoom(roomId);
    if (gameState && gameState.players[socket.id]) {
      delete gameState.players[socket.id];

      // Notify room that a user left
      socket.to(roomId).emit("userLeft", {
        userId: socket.id,
        username: socket.data.username,
        roomId: roomId,
      });
    }
  });

  // Get users in room
  socket.on("getRoomUsers", async (roomId) => {
    const sockets = await io.in(roomId).fetchSockets();
    const users = sockets.map((socket) => ({ userId: socket.id, username: socket.data.username }));

    socket.emit("roomUsers", {
      roomId: roomId,
      users: users,
    });
  });
};

const generatePuzzle = async (difficulty) => {
  try {
    // Select the matching view to get puzzle from
    let view = "puzzle_easy";

    if (difficulty === "medium") {
      view = "puzzle_medium";
    } else if (difficulty === "hard") {
      view = "puzzle_hard";
    } else if (difficulty === "extreme") {
      view = "puzzle_extreme";
    }

    // Query database and return the puzzle
    const { data, error } = await supabase.from(view).select("puzzle").limit(1).single();

    if (error) throw error;

    return data;
  } catch (err) {
    console.log(err);
  }
};

export { setupRoomHandlers };
