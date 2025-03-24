import { createContext, useState, useEffect } from "react";
import { initSocket, disconnectSocket, getSocket } from "../services/socket";

const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize socket
    const socketInstance = initSocket();
    setSocket(socketInstance);

    // Set up listeners
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socketInstance.on("connect", onConnect);
    socketInstance.on("disconnect", onDisconnect);

    // Check initial connection state
    setIsConnected(socketInstance.connected);

    // Cleanup
    return () => {
      socketInstance.off("connect", onConnect);
      socketInstance.off("disconnect", onDisconnect);
      disconnectSocket();
    };
  }, []);

  const contextValue = {
    socket,
    isConnected,
    getSocket,
  };

  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
