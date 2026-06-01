import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <div className="flex h-screen flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold text-blue-600">Welcome to BirdParadise! 🌴</h1>
            <p className="text-gray-600">Home page is coming soon...</p>
          </div>
        } />
      </Routes>
    </div>
  );
}
