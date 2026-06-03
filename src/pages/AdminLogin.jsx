import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";


export default function AdminLogin() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setError('');

        try {
            const url = `${import.meta.env.VITE_API_URL}/admins/login`;

            const response = await axios.post(url, { username: username, password: password });
            login(response.data.admin, response.data.token);

            navigate('/admin/dashboard');

        } catch (error) {
            setError(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-gray-900">Admin Login</h2>
                    <p className="text-gray-500 mt-2">Sign in to manage the rooms</p>
                </div>
                {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Username</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-gray-800 text-white font-bold py-3 rounded hover:bg-gray-900 transition">
                        Login as Admin
                    </button>
                </form>
            </div>
        </div>
    );
}