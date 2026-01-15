import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const businessId = searchParams.get('business_id');

    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState(10000);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = '/products';
                if (businessId) {
                    url += `?business_id=${businessId}`;
                }
                const response = await api.get(url);
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [businessId]);

    useEffect(() => {
        let result = products;

        // Filter by search
        if (searchTerm) {
            result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        // Filter by price
        result = result.filter(p => p.price <= priceRange);

        setFilteredProducts(result);
    }, [searchTerm, priceRange, products]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white p-6 rounded-lg border border-[var(--border)] sticky top-24">
                    <div className="flex items-center gap-2 mb-6 text-[var(--primary)] font-bold">
                        <Filter className="w-5 h-5" />
                        <h2>Filters</h2>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Search</label>
                            <input
                                type="text"
                                placeholder="Product name..."
                                className="input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Max Price: KES {priceRange}</label>
                            <input
                                type="range"
                                min="0"
                                max="20000"
                                step="500"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="w-full accent-[var(--primary)]"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0</span>
                                <span>20k+</span>
                            </div>
                        </div>

                        {/* Categories could be added here if API supports or if we derive them */}
                    </div>
                </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold font-serif">
                        {businessId ? 'Vendor Products' : 'All Products'}
                    </h1>
                    <p className="text-[var(--text-muted)]">Showing {filteredProducts.length} results</p>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.product_id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-lg border border-dashed">
                        <p className="text-gray-500">No products found matching your criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Shop;
