import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import api from '../services/api';
import { useState } from 'react';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, total, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [checkingOut, setCheckingOut] = useState(false);

    const handleCheckout = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setCheckingOut(true);
        try {
            // Need to get customer_id first. In a real app we'd have this in user context context properly.
            // For now, let's look up the customer record for this user if possible, or just fail gracefully if not found.
            // But wait, the seeds assign customers to users. 
            // We need to fetch customer info.

            // Let's assume we can POST to /orders with a dummy customer_id if we don't have it, 
            // OR we try to find the customer associated with this user.
            // The backend doesn't expose a "get customer by user id" easily aside from /customers.
            // I'll fetch customers and find the match.
            const customersRes = await api.get('/customers');
            const customer = customersRes.data.find(c => c.user_id === user.user_id);

            if (!customer) {
                alert("You need to upgrade to a customer account to purchase.");
                // Create customer account logic could go here
                setCheckingOut(false);
                return;
            }

            const orderData = {
                customer_id: customer.customer_id,
                total_amount: total,
                order_type: "retail", // default
                order_status: "pending",
                payment_status: "unpaid",
                delivery_status: "not_shipped"
            };

            const orderRes = await api.post('/orders', orderData);
            const orderId = orderRes.data.order_id;

            // Create order items
            for (const item of cartItems) {
                await api.post('/order_items', {
                    order_id: orderId,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    unit_price: item.price
                });
            }

            clearCart();
            alert("Order placed successfully!");
            navigate('/');

        } catch (error) {
            console.error("Checkout failed:", error);
            alert("Checkout failed. Please try again.");
        } finally {
            setCheckingOut(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20 flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <button onClick={() => navigate('/shop')} className="btn btn-primary px-8">Start Shopping</button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 font-serif">Shopping Cart</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="md:col-span-2 space-y-4">
                    {cartItems.map(item => (
                        <div key={item.product_id} className="bg-white p-4 rounded-lg flex gap-4 border border-[var(--border)]">
                            <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                {/* Ideally product card logic parsing */}
                                <img src="https://images.unsplash.com/photo-1555529733-4917a94b581b?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="flex justify-between">
                                    <h3 className="font-bold text-lg">{item.name}</h3>
                                    <button onClick={() => removeFromCart(item.product_id)} className="text-red-500 hover:text-red-700">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500">Unit Price: KES {item.price}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center gap-3 bg-gray-50 rounded px-2 py-1">
                                        <button onClick={() => updateQuantity(item.product_id, item.quantity - 1)} className="p-1 hover:bg-gray-200 rounded">
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-semibold w-6 text-center">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.product_id, item.quantity + 1)} className="p-1 hover:bg-gray-200 rounded">
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <span className="font-bold text-[var(--primary)]">KES {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="bg-white p-6 rounded-lg border border-[var(--border)] h-fit sticky top-24">
                    <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                    <div className="space-y-2 mb-6 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-bold">KES {total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping Estimate</span>
                            <span className="font-bold">KES 200</span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>KES {(total + 200).toLocaleString()}</span>
                        </div>
                    </div>
                    <button
                        onClick={handleCheckout}
                        disabled={checkingOut}
                        className="btn btn-primary w-full py-3 flex items-center justify-center gap-2"
                    >
                        {checkingOut ? 'Processing...' : (
                            <>Checkout <ArrowRight className="w-4 h-4" /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
