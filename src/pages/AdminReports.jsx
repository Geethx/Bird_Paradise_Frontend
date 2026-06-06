import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminReports() {
    const { admin: user, adminToken: token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [reports, setReports] = useState(null);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/admin/login');
            return;
        }
        fetchReports();
    }, [user, navigate]);

    async function fetchReports() {
        try {
            const url = `${import.meta.env.VITE_API_URL}/admins/reports`;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(url, config);
            setReports(response.data.reports);
        } catch (error) {
            alert(error.response?.data?.message || "Error fetching reports.");
        }
    }

    if (!user || user.role !== 'admin') return null;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-extrabold text-blue-900 drop-shadow-sm">System Reports & Analytics</h2>
                    <button onClick={() => navigate('/admin/dashboard')} className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-900 transition">
                        Back to Dashboard
                    </button>
                </div>

                {!reports ? (
                    <div className="text-center text-gray-500 font-bold p-10">Loading reports...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        
                        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition transform hover:-translate-y-1">
                            <h3 className="text-gray-500 font-bold mb-2">Total Rooms</h3>
                            <p className="text-4xl font-extrabold text-blue-900">{reports.totalRooms}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition transform hover:-translate-y-1">
                            <h3 className="text-gray-500 font-bold mb-2">Confirmed Bookings</h3>
                            <p className="text-4xl font-extrabold text-green-700">{reports.totalConfirmedBookings}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition transform hover:-translate-y-1">
                            <h3 className="text-gray-500 font-bold mb-2">Total Revenue</h3>
                            <p className="text-3xl font-extrabold text-yellow-600">{reports.totalRevenue.toLocaleString()}</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500 hover:shadow-xl transition transform hover:-translate-y-1">
                            <h3 className="text-gray-500 font-bold mb-2">Cancellations</h3>
                            <p className="text-4xl font-extrabold text-red-600">{reports.totalCancellations}</p>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
