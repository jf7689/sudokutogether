class RoomManager {
  constructor() {
    // Store room info
    this.rooms = new Map();
  }

  createRoom(roomId, ownderId, metadata = {}) {
    const roomInfo = {
      id: roomId,
      owner: ownderId,
      metadata: metadata,
    };

    this.rooms.set(roomId, roomInfo);
    return roomInfo;
  }

  getRoom(roomId) {
    return this.rooms.get(roomId);
  }

  isRoomOwner(roomId, userId) {
    const room = this.rooms.get(roomId);
    return room && room.owner === userId;
  }

  transferOwnership(roomId, newOwnerId) {
    const room = this.rooms.get(roomId);
    if (room) {
      room.owner = newOwnerId;
      return true;
    }
    return false;
  }

  deleteRoom(roomId) {
    return this.rooms.delete(roomId);
  }
}
