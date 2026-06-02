import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return setError("Please enter a valid email address.");
        }
        
        try {
            const url = `${import.meta.env.VITE_API_URL}/guests/login`;

            const response = await axios.post(url, { email: email, password: password });

            login(response.data.guest, response.data.token);
            navigate("/");
        } catch (error) {
            setError(error.response?.data?.message || "Login failed. Please check your email and password.");
        }
    };
    return (
        <div className="flex h-screen items-center justify-center bg-blue-50">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Guest Login</h2>

                {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-center">{error}</div>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md">
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )

}