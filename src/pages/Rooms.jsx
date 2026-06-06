import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')

    useEffect(() => {
        fetchRooms();
    }, []);

    async function fetchRooms() {
        try {
            const url = `${import.meta.env.VITE_API_URL}/rooms`;
            const response = await axios.get(url);
            setRooms(response.data);
            setLoading(false);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to load rooms')
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-blue-50">
            <Navbar />

            <div className="py-10 px-4 max-w-6xl mx-auto">
                <h2 className="text-4xl font-extrabold text-blue-900 mb-8 text-center drop-shadow-sm">Our Rooms</h2>
                {error && <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">{error}</div>}
                {loading ? (
                    <div className="text-center font-bold text-gray-500 text-xl">Loading rooms...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rooms.length === 0 && <div className="text-center font-bold text-gray-500 text-xl">No rooms available</div>}
                        {rooms.map((room) => (
                            <div key={room._id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition duration-300">
                                {room.images && room.images.length > 0 ? (
                                    <img src={room.images[0]} alt="Room" className="w-full h-56 object-cover" />
                                ) : (
                                    <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-500 font-bold">No Image</div>
                                )}

                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <h3 className="text-2xl font-bold text-gray-800">Room {room.room_number}</h3>
                                        <span className="uppercase text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                            {room.room_type}
                                        </span>
                                    </div>

                                    <p className="text-xl font-extrabold text-green-600 mb-4">${room.price} <span className="text-sm font-normal text-gray-500">/ night</span></p>
                                    <div className="mt-4 border-t pt-4 flex justify-between items-center">

                                        <Link to={`/book/${room._id}`} 
                                        state={{
                                            roomImage: room.images && room.images.length > 0 ? room.images[0] : null,
                                            roomPrice: room.price,
                                            roomNumber: room.room_number,
                                            roomId: room._id
                                        }}
                                        className="text-blue-600 font-bold hover:underline">
                                            Book Now &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}