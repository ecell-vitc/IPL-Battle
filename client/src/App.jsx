import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/home';
import Login from './pages/login';
import Footer from './components/footer';
import NotFound from './pages/notfound';
import Rules from './pages/Rules';
import Participant from './pages/participant';
import Auctioneer from './pages/auctioneer';
import Admin from './pages/rooms';
import ProtectedRoute from './components/ProtectRoute'; // Import the ProtectedRoute component
import Quiz from './pages/quiz';
import Leaderboard from './pages/leaderboard';
function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/participant/login" element={<Login />} />
        <Route path="/auctioneer/login" element={<Login isauc={true} />} />
        <Route path="/admin/login" element={<Login isAdmin={true} />} />
        <Route path="/quiz/:room_uid" element={<Quiz />} />
        <Route path="/quiz/:room_uid/leaderboard" element={<Leaderboard />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/participant/:room_id" element={<Participant />} />
          <Route path="/auctioneer/:room_id" element={<Auctioneer />} />
          <Route path="/admin/dashboard" element={<Admin />} />
          <Route path="/admin/room/:room_id" element={<Auctioneer />} />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;