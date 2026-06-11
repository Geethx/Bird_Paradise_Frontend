import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-9xl font-extrabold text-blue-500 tracking-widest">404</h1>
                <div className="bg-blue-100 px-2 text-sm rounded rotate-6 absolute">
                    Page Not Found
                </div>
                <p className="text-2xl text-gray-800 font-semibold mt-8 mb-4">
                    Oops! You've lost your way in the paradise.
                </p>
                <p className="text-gray-500 mb-8 max-w-md">
                    The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
                </p>
                <Link to="/" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-lg">
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}
