import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Booking from "./pages/Booking.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRooms from "./pages/AdminRooms.jsx";
import AdminBookings from "./pages/AdminBookings.jsx";
import AdminGuests from "./pages/AdminGuests.jsx";
import AdminReports from "./pages/AdminReports.jsx";
import Rooms from "./pages/Rooms.jsx";
import Chatbot from "./components/Chatbot.jsx";

export default function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/book/:id" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/rooms" element={<AdminRooms />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/guests" element={<AdminGuests />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
      {!isAdminPage && <Chatbot />}
    </div>
  );
}
