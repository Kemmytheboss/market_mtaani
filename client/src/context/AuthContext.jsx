import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for user on load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // In a real app, you'd hit a /login endpoint. 
            // Based on available routes, we might need to query users/verify or similar.
            // But looking at server/app.py, there is no specific login route, just Users GET/POST.
            // We will simulate login by fetching all users and matching credentials (NOT SECURE, but matches backend provided).
            // Ideally we should add a login endpoint.

            // Let's rely on finding the user by email for now or creating a session.
            // Since I can't easily change the backend logic to add Auth without asking, 
            // I will assume we can filter by email effectively or fetch all.
            // Actually, Users GET supports 'role', but not email filter.
            // Fetching all users to find one is inefficient but necessary given the backend.

            const response = await api.get('/users');
            const users = response.data;
            const foundUser = users.find(u => u.email === email && u.password === password);

            if (foundUser) {
                setUser(foundUser);
                localStorage.setItem('user', JSON.stringify(foundUser));
                return { success: true };
            } else {
                return { success: false, error: 'Invalid credentials' };
            }
        } catch (error) {
            console.error("Login error", error);
            return { success: false, error: error.message };
        }
    };

    const signup = async (userData) => {
        try {
            const response = await api.post('/users', userData);
            if (response.status === 201) {
                // Auto login after signup
                const newUser = response.data;
                setUser(newUser);
                localStorage.setItem('user', JSON.stringify(newUser));
                return { success: true };
            }
        } catch (error) {
            console.error("Signup error", error);
            return { success: false, error: error.response?.data?.error || 'Signup failed' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
