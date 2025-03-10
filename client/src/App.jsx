import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import LobbyList from "./pages/LobbyList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="create" element={<Lobby/>} />
        <Route path="lobby" element={<LobbyList/>} />
        <Route path=":code" element={<Game/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App