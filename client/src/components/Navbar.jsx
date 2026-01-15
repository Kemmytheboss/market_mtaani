import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User as UserIcon, LogOut, Store } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { itemCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-[var(--border)] shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl text-[var(--primary)]">
                        <Store className="w-8 h-8" />
                        <span>Market Mtaani</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-[var(--text-main)] hover:text-[var(--primary)] transition-colors">Home</Link>
                        <Link to="/shop" className="text-[var(--text-main)] hover:text-[var(--primary)] transition-colors">Shop</Link>
                        {user?.role === 'vendor' && (
                            <Link to="/dashboard" className="text-[var(--text-main)] hover:text-[var(--primary)] transition-colors">Dashboard</Link>
                        )}
                        {/* 
            <Link to="/about" className="text-[var(--text-main)] hover:text-[var(--primary)] transition-colors">About</Link>
            <Link to="/contact" className="text-[var(--text-main)] hover:text-[var(--primary)] transition-colors">Contact</Link>
             */}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/cart" className="relative p-2 hover:bg-[var(--background)] rounded-full transition-colors">
                            <ShoppingCart className="w-6 h-6 text-[var(--text-main)]" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[var(--accent-secondary)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium">Hello, {user.full_name}</span>
                                <button onClick={handleLogout} className="btn btn-secondary text-sm">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="btn btn-secondary text-sm">Login</Link>
                                <Link to="/signup" className="btn btn-primary text-sm">Sign Up</Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden border-t border-[var(--border)] overflow-hidden bg-white"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            <Link to="/" onClick={() => setIsOpen(false)} className="py-2 hover:text-[var(--primary)]">Home</Link>
                            <Link to="/shop" onClick={() => setIsOpen(false)} className="py-2 hover:text-[var(--primary)]">Shop</Link>
                            {user?.role === 'vendor' && (
                                <Link to="/dashboard" onClick={() => setIsOpen(false)} className="py-2 hover:text-[var(--primary)]">Dashboard</Link>
                            )}

                            <div className="border-t border-[var(--border)] pt-4 flex flex-col gap-4">
                                <Link to="/cart" onClick={() => setIsOpen(false)} className="flex items-center justify-between py-2">
                                    <span>Cart</span>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-[var(--accent-secondary)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                            {itemCount}
                                        </span>
                                        <ShoppingCart className="w-5 h-5" />
                                    </div>
                                </Link>

                                {user ? (
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                            <UserIcon className="w-4 h-4" />
                                            {user.full_name}
                                        </div>
                                        <button onClick={() => { handleLogout(); setIsOpen(false); }} className="btn btn-secondary w-full justify-center">
                                            Logout
                                        </button>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link to="/login" onClick={() => setIsOpen(false)} className="btn btn-secondary justify-center">Login</Link>
                                        <Link to="/signup" onClick={() => setIsOpen(false)} className="btn btn-primary justify-center">Sign Up</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
