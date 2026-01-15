import PropTypes from 'prop-types';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-[var(--background)]">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="bg-[var(--primary-dark)] text-white py-12 mt-auto">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 font-serif">Market Mtaani</h3>
                        <p className="text-gray-300 text-sm">
                            Connecting East Africa's fashion wholesalers, retailers, and style enthusiasts.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a href="/shop" className="hover:text-[var(--accent)]">All Products</a></li>
                            <li><a href="#" className="hover:text-[var(--accent)]">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-[var(--accent)]">Businesses</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a href="#" className="hover:text-[var(--accent)]">Contact Us</a></li>
                            <li><a href="#" className="hover:text-[var(--accent)]">FAQs</a></li>
                            <li><a href="#" className="hover:text-[var(--accent)]">Shipping Info</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Newsletter</h4>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-white/10 border border-white/20 rounded px-3 py-2 text-white text-sm w-full focus:outline-none focus:border-[var(--accent)]"
                            />
                            <button className="bg-[var(--accent)] text-[var(--primary-dark)] px-4 py-2 rounded text-sm font-bold hover:bg-white transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} Market Mtaani. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
