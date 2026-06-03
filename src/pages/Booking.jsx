import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";


export default function Booking() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const { user, token } = useContext(AuthContext);

    const [checkIn, setCheckIn] = useState(location.state?.checkIn || '');
    const [checkOut, setCheckOut] = useState(location.state?.checkOut || '');
    const [price, setPrice] = useState(location.state?.roomPrice || 0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleBooking = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const url = `${import.meta.env.VITE_API_URL}/bookings`;

            const data = {
                room_id: id,
                guest_id: user._id || user.id,
                check_in_date: checkIn,
                check_out_date: checkOut
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            await axios.post(url, data, config);

            setSuccess('Booking confirmed successfully!');

            setTimeout(() => {
                navigate('/my-bookings');
            }, 2000);

        } catch (err) {
            setError(err.response?.data?.message || 'Booking failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 py-10 px-4 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Confirm Your Booking</h2>

                {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">{error}</div>}
                {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center font-bold">{success}</div>}
                <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                    <p className="text-gray-700 mb-2"><strong>Room ID:</strong> {id}</p>
                    <p className="text-gray-700 mb-2"><strong>Check-In:</strong> {checkIn || 'Not Selected'}</p>
                    <p className="text-gray-700 mb-2"><strong>Check-Out:</strong> {checkOut || 'Not Selected'}</p>
                    <p className="text-xl text-blue-800 font-bold mt-4">Price: Rs. {price} / night</p>
                </div>
                    <button type="button" onClick={handleBooking} className="w-full bg-green-500 text-white font-bold py-4 rounded-lg hover:bg-green-600 transition duration-300 shadow-md text-lg">
                        Confirm Booking
                    </button>
            </div>
        </div>
    );
}