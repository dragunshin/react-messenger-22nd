import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Board from "./pages/Board";
import Benefit from "./pages/Benefit";
import TimeTable from "./pages/TimeTable";
import ChatRoom from "./pages/ChatRoom";
import Profile from "./pages/Profile";
import Participants from "./pages/Participants";

function Layout() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith("/chat/") ||
                  location.pathname.startsWith("/profile");
  return (
      <div className="h-full flex flex-col">
        {/* 메인 컨텐츠 */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:roomId" element={<ChatRoom />} />
            <Route path="/chat/:roomId/participants" element={<Participants />} />
            <Route path="/board" element={<Board />} />
            <Route path="/benefit" element={<Benefit />} />
            <Route path="/timetable" element={<TimeTable />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* 네비게이션 바 */}
        {!hideNav && <NavBar />}

        {/* 고정 홈버튼 */}
        {!hideNav && <div className="flex justify-center py-0">
          <img src="/icons/HomeButton.svg" alt="home-button" className="w-full h-2" />
        </div>}
      </div>
  );
}

function App() {
  return (
    <div className="iPhone-frame">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
