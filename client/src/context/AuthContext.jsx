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
            // Use the /login endpoint
            const response = await api.post('/login', { email, password });
            
            if (response.status === 200) {
                const userData = response.data;
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                return { success: true };
            }
        } catch (error) {
            console.error("Login error", error);
            return { 
                success: false, 
                error: error.response?.data?.error || 'Invalid email or password' 
            };
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
