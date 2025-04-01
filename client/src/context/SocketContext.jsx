import { createContext, useState, useEffect } from "react";
import { initSocket, disconnectSocket, getSocket, setUsername } from "../services/socket";
import { SOCKET_EVENTS } from "@/services/socket/events";

const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsernameState] = useState(() => {
    // Get username from localStorage if available
    return localStorage.getItem("username") || "";
  });

  // Update username locally and on the server
  const updateUsername = (newUsername) => {
    if (newUsername) {
      // Save to localStorage
      localStorage.setItem("username", newUsername);

      // Update state
      setUsernameState(newUsername);

      // Update on server
      setUsername(newUsername);
      return true;
    }
    return false;
  };

  useEffect(() => {
    // Initialize socket
    const socketInstance = initSocket();
    setSocket(socketInstance);

    // Set up listeners
    const onConnect = () => {
      setIsConnected(true);

      // Set username on reconnect
      if (username) {
        setUsername(username);
      }
    };
    const onDisconnect = () => setIsConnected(false);

    socketInstance.on(SOCKET_EVENTS.CONNECT, onConnect);
    socketInstance.on(SOCKET_EVENTS.DISCONNECT, onDisconnect);

    // Check initial connection state
    setIsConnected(socketInstance.connected);

    // Cleanup
    return () => {
      socketInstance.off(SOCKET_EVENTS.CONNECT, onConnect);
      socketInstance.off(SOCKET_EVENTS.DISCONNECT, onDisconnect);
      disconnectSocket();
    };
  }, [username]);

  const contextValue = {
    socket,
    isConnected,
    getSocket,
    username,
    updateUsername,
  };

  return <SocketContext.Provider value={contextValue}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
