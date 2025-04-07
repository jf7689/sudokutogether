const setupRoomHandlers = (io, socket) => {
  // Store username in socket object
  socket.on("setUsername", (username) => {
    socket.data.username = username;
    console.log(`User ${socket.id} set username to: ${username}`);
  });

  // Join a room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.data.username || socket.id} joined room: ${roomId}`);

    // Notify room that a new user joined
    socket.to(roomId).emit("userJoined", {
      userId: socket.id,
      username: socket.data.username,
      roomId: roomId,
    });
  });

  // Leave a room
  socket.on("leaveRoom", (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.data.username || socket.id} left room: ${roomId}`);

    // Notify room that a user left
    socket.to(roomId).emit("userLeft", {
      userId: socket.id,
      username: socket.data.username,
      roomId: roomId,
    });
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

export { setupRoomHandlers };
