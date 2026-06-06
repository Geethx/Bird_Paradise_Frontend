import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Navbar from "../components/Navbar";



export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchMyBookings();
    }, [user, navigate]);

    async function fetchMyBookings() {
        try {
            const url = `${import.meta.env.VITE_API_URL}/bookings/my-bookings`;

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.get(url, config);

            setBookings(response.data.bookings);
            setLoading(false);

        } catch (err) {
            setError('Failed to load your bookings.');
            setLoading(false);
        }
    };

    async function handleCancel(bookingId) {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        
        try {
            const url = `${import.meta.env.VITE_API_URL}/bookings/${bookingId}/cancel`;
            const config = { headers: { Authorization: `Bearer ${token}` } };

            await axios.patch(url, {}, config);

            fetchMyBookings();

        } catch (error) {
            alert(error.response?.data?.message || 'Failed to cancel booking.');
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-blue-600">Loading your bookings...</div>;
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-4xl mx-auto mt-10">
                <h2 className="text-3xl font-bold text-blue-900 mb-8">My Bookings</h2>
                {error && <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">{error}</div>}
                {bookings.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl shadow-md text-center text-gray-500 text-lg">
                        You have no bookings yet. Go to the Home page to find a room!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500 flex flex-col md:flex-row justify-between items-center hover:shadow-lg transition">

                                <div className="w-full md:w-3/4 mb-4 md:mb-0">
                                    <div className="flex items-center gap-4 mb-2">
                                        <h3 className="text-xl font-bold text-gray-800">Room {booking.room_id?.room_number}</h3>

                                        <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase
                                            ${booking.booking_status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                            ${booking.booking_status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                                            ${booking.booking_status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                                            ${booking.booking_status === 'rejected' ? 'bg-gray-100 text-gray-800' : ''}
                                        `}>
                                            {booking.booking_status}
                                        </span>
                                    </div>

                                    <p className="text-gray-600"><strong>Check-In:</strong> {new Date(booking.check_in_date).toLocaleDateString()}</p>
                                    <p className="text-gray-600"><strong>Check-Out:</strong> {new Date(booking.check_out_date).toLocaleDateString()}</p>
                                    <p className="text-blue-600 font-bold mt-2">Rs. {booking.room_id?.price} / night</p>
                                </div>
                                {(booking.booking_status === 'pending' || booking.booking_status === 'confirmed') && (
                                    <button
                                        onClick={() => handleCancel(booking._id)}
                                        className="w-full md:w-auto bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition shadow"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}