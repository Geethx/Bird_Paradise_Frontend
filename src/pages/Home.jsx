import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"

export default function Home() {
    const { user, logout } = useContext(AuthContext)

    return (
        <div className="min-h-screen bg-blue-50">
            <nav className="bg-white shadow-md p-4 flex justify-between items-center px-10">
                <h1 className="text-2xl font-bold text-blue-800">BirdParadise 🌴</h1>
                <div>
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="font-medium text-gray-700">
                                Hello, {user.name || user.username}!
                            </span>
                            <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition shadow">
                                Logout
                            </button>
                        </div>) : (
                        <div className="flex gap-4 items-center">
                            <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
                            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow">Register</Link>
                        </div>
                    )}
                </div>
            </nav>
            <div className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
                <h2 className="text-5xl font-extrabold text-blue-900 mb-6 drop-shadow-sm">
                    Experience Nature in Comfort
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                    Welcome to BirdParadise Guest House. Relax, unwind, and enjoy the beautiful surroundings. Book your perfect room today!
                </p>

                <Link to="/search" className="bg-green-500 text-white text-xl font-bold px-8 py-4 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-105">
                    Check Availability
                </Link>
            </div>
        </div>
    )
}