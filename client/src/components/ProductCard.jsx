import PropTypes from 'prop-types';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    // Parse image URL from description if present (format: "Description. Image: url")
    // Or assume a default if not found.
    let imageUrl = "https://images.unsplash.com/photo-1555529733-4917a94b581b?auto=format&fit=crop&q=80&w=600";
    let description = product.description || "";

    if (description.includes("Image: ")) {
        const parts = description.split("Image: ");
        description = parts[0];
        imageUrl = parts[1].trim();
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card group flex flex-col h-full"
        >
            <Link to={`/products/${product.product_id}`} className="relative overflow-hidden aspect-[4/5] block bg-gray-100">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.stock_quantity === 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">Out of Stock</span>
                    </div>
                )}
            </Link>

            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <Link to={`/products/${product.product_id}`}>
                        <h3 className="font-semibold text-lg leading-tight hover:text-[var(--primary)] transition-colors line-clamp-2">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                <p className="text-[var(--text-muted)] text-sm mb-4 line-clamp-2">{description}</p>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="font-bold text-lg">KES {product.price.toLocaleString()}</span>
                        {product.bulk_price && (
                            <span className="text-xs text-[var(--success)] font-medium">
                                Bulk: KES {product.bulk_price.toLocaleString()} (Min {product.min_bulk_quantity})
                            </span>
                        )}
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock_quantity === 0}
                        className="p-3 bg-[var(--primary)] text-white rounded-full hover:bg-[var(--primary-dark)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                        aria-label="Add to cart"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        product_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
        bulk_price: PropTypes.number,
        min_bulk_quantity: PropTypes.number,
        stock_quantity: PropTypes.number,
    }).isRequired,
};

export default ProductCard;
