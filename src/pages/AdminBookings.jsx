import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminBookings() {
    const { admin: user, adminToken: token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/admin/login');
            return;
        }
        fetchBookings();
    }, [user, navigate]);

    async function fetchBookings() {
        try {
            const url = `${import.meta.env.VITE_API_URL}/bookings`;
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const response = await axios.get(url, config);
            setBookings(response.data.bookings);

        } catch (error) {
            alert(error.response?.data?.message || "Error fetching bookings.");
        }
    };

    async function handleConfirm(id) {
        if (!window.confirm("Confirm this booking?")) return;
        try {
            const url = `${import.meta.env.VITE_API_URL}/bookings/${id}/confirm`;
            const config = { headers: { Authorization: `Bearer ${token}` } };

            await axios.patch(url, {}, config);
            fetchBookings();

        } catch (error) {
            alert(error.response?.data?.message || "Failed to confirm booking");
        }
    };

    async function handleReject(id) {
        if (!window.confirm("Are you sure you want to REJECT this booking?")) return;
        try {
            const url = `${import.meta.env.VITE_API_URL}/bookings/${id}/reject`;
            const config = { headers: { Authorization: `Bearer ${token}` } };

            await axios.patch(url, {}, config);
            fetchBookings();

        } catch (error) {
            alert(error.response?.data?.message || "Failed to reject booking");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-800">Manage Bookings</h2>
                    <button onClick={() => navigate('/admin/dashboard')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
                        Back to Dashboard
                    </button>
                </div>
                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="p-4">Guest Info</th>
                                <th className="p-4">Room No</th>
                                <th className="p-4">Dates</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length === 0 ? (
                                <tr><td colSpan="5" className="p-4 text-center text-gray-500 font-bold">No bookings found in the system.</td></tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking._id} className="border-b hover:bg-gray-50 transition">

                                        <td className="p-4">
                                            <div className="font-bold text-gray-800">{booking.guest_id?.name || "Deleted User"}</div>
                                            <div className="text-sm text-gray-500">{booking.guest_id?.email}</div>
                                        </td>

                                        <td className="p-4 font-bold text-blue-900">
                                            Room {booking.room_id?.room_number || "(Deleted)"}
                                        </td>

                                        <td className="p-4 text-sm text-gray-700">
                                            <div className="font-semibold text-green-700">In: {new Date(booking.check_in_date).toLocaleDateString()}</div>
                                            <div className="font-semibold text-red-700">Out: {new Date(booking.check_out_date).toLocaleDateString()}</div>
                                            {booking.total_price && (
                                                <div className="font-bold text-blue-800 mt-1 pt-1 border-t border-gray-200">
                                                    Total: $ {booking.total_price}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                                                ${booking.booking_status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                ${booking.booking_status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                                                ${booking.booking_status === 'cancelled' ? 'bg-gray-200 text-gray-600' : ''}
                                                ${booking.booking_status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                                            `}>
                                                {booking.booking_status}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            {booking.booking_status === 'cancelled' || booking.booking_status === 'rejected' || booking.booking_status === 'confirmed' ? (
                                                <span className="text-gray-400 text-sm italic">No actions needed</span>
                                            ) : (
                                                <div className="flex gap-2">
                                                    {booking.booking_status === 'pending' && (
                                                        <button
                                                            onClick={() => handleConfirm(booking._id)}
                                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition text-sm shadow font-bold"
                                                        >
                                                            Confirm
                                                        </button>
                                                    )}

                                                    <button
                                                        onClick={() => handleReject(booking._id)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm shadow font-bold"
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );


}