import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Booking() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const { user, token } = useContext(AuthContext);

    const [checkInDate, setCheckInDate] = useState(location.state?.checkIn ? new Date(location.state.checkIn) : null);
    const [checkOutDate, setCheckOutDate] = useState(location.state?.checkOut ? new Date(location.state.checkOut) : null);
    const [price, setPrice] = useState(location.state?.roomPrice || 0);
    const [image, setImage] = useState(location.state?.roomImage || null);
    const [roomNumber, setRoomNumber] = useState(location.state?.roomNumber || null);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [bookedDates, setBookedDates] = useState([]);

    useEffect(() => {
        async function fetchBookedDates() {
            try {
                const url = `${import.meta.env.VITE_API_URL}/bookings/${id}/booked-dates`;
                const response = await axios.get(url);
                setBookedDates(response.data.bookedDates);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch booked dates.');
            }
        };
        fetchBookedDates();
    }, [id]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    async function handleBooking(e) {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const url = `${import.meta.env.VITE_API_URL}/bookings`;

            const data = {
                room_id: id,
                guest_id: user._id || user.id,
                check_in_date: checkInDate ? checkInDate.toISOString().split("T")[0] : '',
                check_out_date: checkOutDate ? checkOutDate.toISOString().split("T")[0] : ''
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

    function getDisabledDates() {
        let dates = [];
        bookedDates.forEach(booking => {
            let currentDate = new Date(booking.check_in_date);
            const endDate = new Date(booking.check_out_date);
            while (currentDate <= endDate) {
                dates.push(new Date(currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });
        return dates;
    };
    const disabledDatesArray = getDisabledDates();

    return (
        <div className="min-h-screen bg-blue-50 py-10 px-4 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8">
                <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Confirm Your Booking</h2>

                {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">{error}</div>}
                {success && <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-center font-bold">{success}</div>}
                <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                    {image && (
                        <img src={image} alt="Room" className="w-full h-48 object-cover rounded-md mb-4 shadow-sm" />
                    )}
                    <p className="text-gray-700 mb-2"><strong>Room Number:</strong> {roomNumber || id}</p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block text-gray-700 font-bold mb-1">Check-In Date</label>
                            <DatePicker
                                selected={checkInDate}
                                onChange={(date) => setCheckInDate(date)}
                                selectsStart
                                startDate={checkInDate}
                                endDate={checkOutDate}
                                minDate={new Date()}
                                excludeDates={disabledDatesArray}
                                dayClassName={(date) =>
                                    disabledDatesArray.some(
                                        (d) =>
                                            d.getDate() === date.getDate() &&
                                            d.getMonth() === date.getMonth() &&
                                            d.getFullYear() === date.getFullYear()
                                    )
                                        ? "!bg-red-200 !text-red-700 line-through rounded-md"
                                        : undefined
                                }
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholderText="Select Check-In Date"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-700 font-bold mb-1">Check-Out Date</label>
                            <DatePicker
                                selected={checkOutDate}
                                onChange={(date) => setCheckOutDate(date)}
                                selectsEnd
                                startDate={checkInDate}
                                endDate={checkOutDate}
                                minDate={checkInDate || new Date()}
                                excludeDates={disabledDatesArray}
                                dayClassName={(date) =>
                                    disabledDatesArray.some(
                                        (d) =>
                                            d.getDate() === date.getDate() &&
                                            d.getMonth() === date.getMonth() &&
                                            d.getFullYear() === date.getFullYear()
                                    )
                                        ? "!bg-red-200 !text-red-700 line-through rounded-md"
                                        : undefined
                                }
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholderText="Select Check-Out Date"
                                required
                            />
                        </div>
                    </div>
                    <p className="text-xl text-blue-800 font-bold mt-4">Price: $ {price} / night</p>
                </div>
                <button type="button" onClick={handleBooking} className="w-full bg-green-500 text-white font-bold py-4 rounded-lg hover:bg-green-600 transition duration-300 shadow-md text-lg">
                    Confirm Booking
                </button>
            </div>
        </div>
    );
}