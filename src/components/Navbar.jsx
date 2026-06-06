import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center px-10">

            <Link to="/" className="text-2xl font-bold text-blue-400">BirdParadise 🌴</Link>
            
            <div className="flex items-center gap-6">
                {user ? (
                    <>
                        <Link to="/search" className="font-semibold text-blue-400 hover:text-blue-600 transition">Check Availability</Link>
                        <Link to="/rooms" className="font-semibold text-blue-400 hover:text-blue-600 transition">Rooms</Link>
                        <Link to="/my-bookings" className="font-semibold text-blue-400 hover:text-blue-600 transition">My Bookings</Link>
                        <span className="font-medium text-blue-400 border-l-2 pl-4 border-gray-300">
                            Hello, {user.name}!
                        </span>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
                        <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
