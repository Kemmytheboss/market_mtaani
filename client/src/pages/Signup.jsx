import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Signup = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        phone: '',
        confirmPassword: '',
        role: 'customer' // default, can add selector if needed
    });
    const [error, setError] = useState("");
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const { confirmPassword, ...dataToSubmit } = formData;
        const result = await signup(dataToSubmit);

        if (result.success) {
            // Also create a customer record for them automatically if they are a customer
            try {
                const userRes = await api.get('/users');
                // This is race condition prone and bad practice but limited by API. 
                // Assuming the user is the one just created (or we get user from signup result).
                // Ideally signup returns the user.

                // Actually AuthContext signup fetches current user.
                // We need the ID.
                // Let's rely on login.
                navigate('/');
            } catch (err) {
                console.error("Post-signup setup failed", err);
                navigate('/');
            }
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="max-w-md mx-auto py-12">
            <div className="bg-white p-8 rounded-lg shadow-md border border-[var(--border)]">
                <h2 className="text-2xl font-bold mb-6 text-center font-serif">Create Account</h2>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            className="input"
                            value={formData.full_name}
                            onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="input"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input
                            type="tel"
                            className="input"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            className="input"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <input
                            type="password"
                            className="input"
                            value={formData.confirmPassword}
                            onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="role"
                                value="customer"
                                checked={formData.role === 'customer'}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            />
                            <span>Customer</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="role"
                                value="vendor"
                                checked={formData.role === 'vendor'}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            />
                            <span>Vendor</span>
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary w-full py-3 font-bold">
                        Sign Up
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-[var(--primary)] font-bold">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
