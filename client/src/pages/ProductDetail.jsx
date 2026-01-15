import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ArrowLeft, Truck, ShieldCheck, Star } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    // Parse image
    let imageUrl = "https://images.unsplash.com/photo-1555529733-4917a94b581b?auto=format&fit=crop&q=80&w=1000";
    let description = product.description || "";
    if (description.includes("Image: ")) {
        const parts = description.split("Image: ");
        description = parts[0];
        imageUrl = parts[1].trim();
    }

    return (
        <div className="max-w-6xl mx-auto">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--primary)] mb-6">
                <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-sm border border-[var(--border)]">
                {/* Image Side */}
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                    <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
                </div>

                {/* Info Side */}
                <div className="flex flex-col">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="badge bg-gray-100 text-gray-600">Category {product.category_id}</span>
                        {product.stock_quantity > 0 ? (
                            <span className="badge bg-green-100 text-green-700">In Stock</span>
                        ) : (
                            <span className="badge bg-red-100 text-red-700">Out of Stock</span>
                        )}
                    </div>

                    <h1 className="text-3xl font-bold font-serif mb-4">{product.name}</h1>

                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl font-bold text-[var(--primary)]">KES {product.price.toLocaleString()}</span>
                        {product.bulk_price && (
                            <span className="text-sm border border-green-200 bg-green-50 px-3 py-1 rounded text-green-700">
                                Bulk price: KES {product.bulk_price.toLocaleString()} (Min {product.min_bulk_quantity} pcs)
                            </span>
                        )}
                    </div>

                    <p className="text-[var(--text-muted)] leading-relaxed mb-8 text-lg">
                        {description}
                    </p>

                    <div className="flex flex-col gap-4 mt-auto">
                        <button
                            onClick={() => addToCart(product)}
                            disabled={product.stock_quantity === 0}
                            className="btn btn-primary w-full py-4 text-lg shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            Add to Cart
                        </button>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 p-2 rounded-full text-blue-600"><Truck className="w-5 h-5" /></div>
                            <div className="text-sm">
                                <p className="font-bold">Fast Delivery</p>
                                <p className="text-gray-500">Within Nairobi</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="bg-purple-50 p-2 rounded-full text-purple-600"><ShieldCheck className="w-5 h-5" /></div>
                            <div className="text-sm">
                                <p className="font-bold">Verified Seller</p>
                                <p className="text-gray-500">Quality Assured</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
