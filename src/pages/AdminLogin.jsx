import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


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
         
         const response = await axios.post(url, {username: username, password: password});
         login(response.data.admin, response.data.token);

         navigate('/admin/dashboard');

        } catch (error) {
            setError(error.response?.data?.message || "Login Failed");
        } 
    };
}