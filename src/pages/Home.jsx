import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Home() {

    return (
        <div className="min-h-screen bg-blue-50">
            <Navbar />
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