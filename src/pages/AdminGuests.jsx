import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminGuests() {
    const { admin: user, adminToken: token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/admin/login');
            return;
        }
        fetchGuests();
    }, [user, navigate]);

    async function fetchGuests() {
        try {
            const url = `${import.meta.env.VITE_API_URL}/guests`;
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const response = await axios.get(url, config);
            setGuests(response.data.guests);
        } catch (error) {
            alert(error.response?.data?.message || "Error fetching guests.");
        }
    }

    if (!user || user.role !== 'admin') return null;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-extrabold text-blue-900 drop-shadow-sm">Registered Guests</h2>
                    <button onClick={() => navigate('/admin/dashboard')} className="bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-900 transition">
                        Back to Dashboard
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {guests.length === 0 ? (
                        <div className="p-8 text-center text-gray-500 font-medium">No guests registered yet.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-blue-900 text-white">
                                    <tr>
                                        <th className="p-4 font-semibold">Name</th>
                                        <th className="p-4 font-semibold">Email</th>
                                        <th className="p-4 font-semibold">Phone</th>
                                        <th className="p-4 font-semibold">Joined At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {guests.map((guest, index) => (
                                        <tr key={guest._id} className={`border-b transition hover:bg-blue-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                            <td className="p-4 font-bold text-gray-800">{guest.name}</td>
                                            <td className="p-4 text-gray-600">{guest.email}</td>
                                            <td className="p-4 text-gray-600">{guest.phone}</td>
                                            <td className="p-4 text-gray-500 text-sm">{new Date(guest.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
