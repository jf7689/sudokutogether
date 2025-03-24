import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import CreateGame from "./pages/CreateGame";
import Game from "./pages/Game";
import LobbyList from "./pages/LobbyList";
import { SocketProvider } from "./context/SocketContext";

const App = () => {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="create" element={<CreateGame />} />
          <Route path="lobby" element={<LobbyList />} />
          <Route path=":roomId" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
};

export default App;
