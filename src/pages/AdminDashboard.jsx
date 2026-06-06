import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
    const { admin: user, logoutAdmin: logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/admin/login');
        }
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-100 font-sans">

            <nav className="bg-gray-800 text-white shadow-lg p-4 px-8 flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-wider">BirdParadise Admin Panel</h1>
                <div className="flex items-center gap-6">
                    <span className="text-gray-300">Logged in as: <strong className="text-white">{user.username}</strong></span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-bold transition shadow"
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <div className="max-w-6xl mx-auto py-12 px-4">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Dashboard Overview</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <Link to="/admin/rooms" className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 p-10 flex flex-col items-center justify-center border-t-8 border-blue-500">
                        <div className="bg-blue-100 p-6 rounded-full mb-6">
                            <span className="text-5xl">🛏️</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Manage Rooms</h3>
                        <p className="text-gray-500 text-center">Add new rooms, update prices, or delete existing rooms.</p>
                    </Link>

                    <Link to="/admin/bookings" className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 p-10 flex flex-col items-center justify-center border-t-8 border-green-500">
                        <div className="bg-green-100 p-6 rounded-full mb-6">
                            <span className="text-5xl">📅</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Manage Bookings</h3>
                        <p className="text-gray-500 text-center">View all customer bookings, confirm, or reject them.</p>
                    </Link>

                    <Link to="/admin/guests" className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 p-10 flex flex-col items-center justify-center border-t-8 border-purple-500">
                        <div className="bg-purple-100 p-6 rounded-full mb-6">
                            <span className="text-5xl">👥</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">View Guests</h3>
                        <p className="text-gray-500 text-center">See a list of all registered guests in the system.</p>
                    </Link>

                    <Link to="/admin/reports" className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 p-10 flex flex-col items-center justify-center border-t-8 border-yellow-500">
                        <div className="bg-yellow-100 p-6 rounded-full mb-6">
                            <span className="text-5xl">📈</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">System Reports</h3>
                        <p className="text-gray-500 text-center">View analytics, revenue, and overall statistics.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}