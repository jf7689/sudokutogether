class RoomManager {
  constructor(io) {
    this.io = io;
    this.rooms = new Map();
  }

  // Create a new room
  createRoom(roomId, metadata = {}) {
    this.rooms.set(roomId, {
      id: roomId,
      createdAt: new Date(),
      ...metadata,
    });
    return this.rooms.get(roomId);
  }

  // Get room
  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  // Delete room
  deleteRoom(roomId) {
    return this.rooms.delete(roomId);
  }

  // Get all users in a room
  async getRoomUsers(roomId) {
    const sockets = await this.io.in(roomId).fetchSockets();
    return sockets.map((socket) => socket.id);
  }
}

export { RoomManager };
