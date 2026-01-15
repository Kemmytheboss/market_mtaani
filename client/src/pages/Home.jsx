import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, TrendingUp, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import BusinessCard from '../components/BusinessCard';
import { motion } from 'framer-motion';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [topBusinesses, setTopBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Clear any previous errors
                setError(null);

                const [productsRes, businessesRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/businesses')
                ]);

                // Simulating "Featured" by taking first 4 items
                setFeaturedProducts(productsRes.data.slice(0, 4));
                setTopBusinesses(businessesRes.data.slice(0, 3));
            } catch (error) {
                console.error("Error fetching home data:", error);
                setError("Unable to load latest trends. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[50vh] text-center space-y-4">
                <div className="text-red-500 text-xl font-semibold">Oops! Something went wrong.</div>
                <p className="text-gray-600">{error}</p>
                <button onClick={() => window.location.reload()} className="btn btn-primary mt-4">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-16">
            {/* Hero Section with Organic Shapes */}
            <section className="relative overflow-hidden bg-[var(--primary)] text-white rounded-3xl shadow-2xl isolate">
                {/* Abstract Background Shapes */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--primary-light)] rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

                <div className="relative z-10 py-20 px-8 md:px-16 flex flex-col items-center text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6 font-serif leading-tight"
                    >
                        Discover East Africa's <br />
                        <span className="text-[var(--accent)]">Finest Fashion</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl"
                    >
                        Connect directly with verified wholesalers and retailers.
                        Elevate your style with authentic, high-quality products.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <Link to="/shop" className="btn bg-[var(--accent)] text-white px-8 py-3 rounded-full font-bold hover:bg-[var(--accent-secondary)] transition-all shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:-translate-y-1">
                            Shop Now <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/signup" className="btn border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[var(--primary)] transition-colors">
                            Join as Vendor
                        </Link>
                    </motion.div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] fill-[var(--background)]">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
                    </svg>
                </div>
            </section>

            {/* Features Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-white rounded-2xl shadow-sm border border-[var(--border)] flex flex-col items-center text-center hover:border-[var(--accent)] transition-colors group">
                    <div className="w-14 h-14 bg-orange-50 text-[var(--accent)] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                        <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-[var(--primary)]">Curated Selection</h3>
                    <p className="text-[var(--text-muted)]">Handpicked fashion items from top local designers and wholesalers.</p>
                </div>
                <div className="p-8 bg-white rounded-2xl shadow-sm border border-[var(--border)] flex flex-col items-center text-center hover:border-[var(--accent)] transition-colors group">
                    <div className="w-14 h-14 bg-green-50 text-[var(--success)] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[var(--success)] group-hover:text-white transition-colors">
                        <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-[var(--primary)]">Verified Vendors</h3>
                    <p className="text-[var(--text-muted)]">Shop with confidence from verified businesses with trusted ratings.</p>
                </div>
                <div className="p-8 bg-white rounded-2xl shadow-sm border border-[var(--border)] flex flex-col items-center text-center hover:border-[var(--accent)] transition-colors group">
                    <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <TrendingUp className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-[var(--primary)]">Best Prices</h3>
                    <p className="text-[var(--text-muted)]">Get competitive retail and wholesale prices directly from the source.</p>
                </div>
            </section>

            {/* Featured Products */}
            <section>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-[var(--text-main)] font-serif">Trending Now</h2>
                    <Link to="/shop" className="text-[var(--primary)] font-semibold hover:underline">View All</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map(product => (
                        <ProductCard key={product.product_id} product={product} />
                    ))}
                </div>
            </section>

            {/* Top Businesses */}
            <section className="bg-[var(--background)] py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-[var(--text-main)] font-serif">Top Merchants</h2>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {topBusinesses.map(business => (
                        <BusinessCard key={business.vendor_id} business={business} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
