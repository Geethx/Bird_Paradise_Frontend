import { useState, createContext } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('guest_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem('guest_token') || null;
    });

    const [admin, setAdmin] = useState(() => {
        const savedAdmin = localStorage.getItem('admin_user');
        return savedAdmin ? JSON.parse(savedAdmin) : null;
    });
    const [adminToken, setAdminToken] = useState(() => {
        return localStorage.getItem('admin_token') || null;
    });

    const login = (userData, jwtToken) => {
        setUser(userData);
        setToken(jwtToken);
        localStorage.setItem('guest_user', JSON.stringify(userData));
        localStorage.setItem('guest_token', jwtToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('guest_user');
        localStorage.removeItem('guest_token');
    };

    const loginAdmin = (adminData, jwtToken) => {
        setAdmin(adminData);
        setAdminToken(jwtToken);
        localStorage.setItem('admin_user', JSON.stringify(adminData));
        localStorage.setItem('admin_token', jwtToken);
    };

    const logoutAdmin = () => {
        setAdmin(null);
        setAdminToken(null);
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token');
    };

    return (
        <AuthContext.Provider value={{ 
            user, token, login, logout,
            admin, adminToken, loginAdmin, logoutAdmin 
        }}>
            {children}
        </AuthContext.Provider>
    );
};