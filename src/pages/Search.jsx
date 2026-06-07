import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Search() {
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState();
    const [roomType, setRoomType] = useState('single');

    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        return d.toISOString().split('T')[0];
    };

    async function handleSearch(e) {
        e.preventDefault();
        setError('');

        if (new Date(checkIn) >= new Date(checkOut)) {
            return setError("Check-Out date must be after Check-In date.");
        }
        try {
            const checkInStr = formatDate(checkIn);
            const checkOutStr = formatDate(checkOut);
            const url = `${import.meta.env.VITE_API_URL}/rooms/available?checkIn=${checkInStr}&checkOut=${checkOutStr}&roomType=${roomType}`;
            const response = await axios.get(url);

            setRooms(response.data.rooms);
            setSearched(true);

        } catch (error) {
            setError(error.response?.data?.message || "Failed to search rooms. Please try again!");
        }
    };

    return (
        <div className="min-h-screen bg-blue-50">
            <Navbar />
            <div className="max-w-4xl mx-auto mt-10">
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">Find Your Perfect Room</h2>

                    {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">{error}</div>}

                    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Check-In Date</label>
                            <DatePicker
                                selected={checkIn}
                                onChange={(date) => setCheckIn(date)}
                                selectsStart
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={new Date()}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholderText="Select Check-In Date"
                                required
                            />

                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Check-Out Date</label>
                            <DatePicker
                                selected={checkOut}
                                onChange={(date) => setCheckOut(date)}
                                selectsEnd
                                startDate={checkIn}
                                endDate={checkOut}
                                minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : new Date(new Date().getTime() + 86400000)}
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholderText="Select Check-Out Date"
                                required
                            />

                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Room Type</label>
                            <select
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                            >
                                <option value="single">Single</option>
                                <option value="double">Double</option>
                                <option value="suite">Suite</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
                            Search Rooms
                        </button>
                    </form>
                </div>

                {searched && (
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Available Rooms: {rooms.length}</h3>

                        {rooms.length === 0 ? (
                            <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
                                Sorry, no rooms available for these dates.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {rooms.map((room) => (
                                    <div key={room._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                                        {room.images && room.images.length > 0 ? (
                                            <img
                                                src={room.images[0]}
                                                alt={`Room ${room.room_number}`}
                                                className="w-full h-56 object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-400 font-medium">No Image Available</div>
                                        )}
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <h4 className="text-xl font-bold text-blue-900">Room {room.room_number}</h4>
                                                <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full uppercase">
                                                    {room.room_type}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-4">Enjoy a comfortable stay with all essential amenities included.</p>
                                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                                <span className="text-2xl font-bold text-gray-800">${room.price}<span className="text-sm text-gray-500 font-normal"> / night</span></span>

                                                <Link
                                                    to={`/book/${room._id}`}
                                                    state={{
                                                        checkIn: formatDate(checkIn),
                                                        checkOut: formatDate(checkOut),
                                                        roomPrice: room.price,
                                                        roomNumber: room.room_number,
                                                        roomImage: room.images && room.images.length > 0 ? room.images[0] : null
                                                    }}
                                                    className="bg-green-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-600 transition">
                                                    Book Now
                                                </Link>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

    )
}