import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export default function AdminRooms() {
    const { admin: user, adminToken: token } = useContext(AuthContext);
    const navigate = useNavigate();

    const [rooms, setRooms] = useState([]);

    const [roomNumber, setRoomNumber] = useState('');
    const [roomType, setRoomType] = useState('single')
    const [price, setPrice] = useState('')
    const [images, setImages] = useState(null);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/admin/login');
            return;
        }
        fetchRooms();
    }, [user, navigate]);

    async function fetchRooms() {
        try {
            const url = `${import.meta.env.VITE_API_URL}/rooms`;
            const response = await axios.get(url);
            setRooms(response.data);

        } catch (error) {
            alert("Error fetching rooms. Is the backend running?");

        }

    }

    async function handleAddRoom(e) {
        e.preventDefault();

        try {
            const url = `${import.meta.env.VITE_API_URL}/rooms`;

            const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };

            const formData = new FormData();
            formData.append('room_number', roomNumber);
            formData.append('room_type', roomType);
            formData.append('price', price);

            if (images) {
                for (let i = 0; i < images.length; i++) {
                    formData.append('images', images[i]);
                }
            }
            await axios.post(url, formData, config);

            setRoomNumber('');
            setPrice('');
            setRoomType('single');
            setImages(null);
            document.getElementById('imageInput').value = "";
            fetchRooms();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to add room");
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this room?")) return;
        try {
            const url = `${import.meta.env.VITE_API_URL}/rooms/${id}`;
            const config = { headers: { Authorization: `Bearer ${token}` } };

            await axios.delete(url, config);

            fetchRooms();
        } catch (error) {
            alert("Failed to delete room");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-800">Manage Rooms</h2>
                    <button onClick={() => navigate('/admin/dashboard')} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
                        Back to Dashboard
                    </button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
                        <h3 className="text-xl font-bold mb-4 text-blue-900 border-b pb-2">Add New Room</h3>
                        <form onSubmit={handleAddRoom} className="space-y-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-1">Room Number</label>
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                                    value={roomNumber}
                                    onChange={(e) => setRoomNumber(e.target.value)}
                                    placeholder="e.g. 101"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-1">Room Type</label>
                                <select
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                                    value={roomType}
                                    onChange={(e) => setRoomType(e.target.value)}
                                >
                                    <option value="single">Single</option>
                                    <option value="double">Double</option>
                                    <option value="suite">Suite</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-1">Price per Night</label>
                                <input
                                    type="number"
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="e.g. 5000"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-bold mb-1">Room Images</label>
                                <input
                                    id="imageInput"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => setImages(e.target.files)}
                                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">You can select multiple images at once.</p>
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition">
                                Add Room
                            </button>
                        </form>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="p-4">Image</th>
                                        <th className="p-4">Room No</th>
                                        <th className="p-4">Type</th>
                                        <th className="p-4">Price</th>
                                        <th className="p-4">Status</th>
                                        <th className="p-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rooms.length === 0 ? (
                                        <tr><td colSpan="5" className="p-4 text-center text-gray-500">No rooms available. Add one!</td></tr>
                                    ) : (
                                        rooms.map((room) => (
                                            <tr key={room._id} className="border-b hover:bg-gray-50 transition">
                                                <td className="p-4">
                                                    {room.images && room.images.length > 0 ? (
                                                        <img
                                                            src={room.images[0]}
                                                            alt={`Room{room.room_number}`}
                                                            className="w-16 h-16 object-cover rounded"
                                                        />
                                                    ) : (
                                                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">No Img</div>
                                                    )}
                                                </td>
                                                <td className="p-4 font-bold text-blue-900">{room.room_number}</td>
                                                <td className="p-4 uppercase text-sm font-semibold text-gray-600">{room.room_type}</td>
                                                <td className="p-4">Rs. {room.price}</td>
                                                <td className="p-4">
                                                    {room.is_occupied_today ? (
                                                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm">🔴 Occupied</span>
                                                    ) : room.availability_status ? (
                                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm">🟢 Available</span>
                                                    ) : (
                                                        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm">⚙️ Maintenance</span>
                                                    )}
                                                </td>

                                                <td className="p-4">
                                                    <button onClick={() => handleDelete(room._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm shadow">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

}