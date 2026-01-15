import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plus, Package } from 'lucide-react';

const VendorDashboard = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);

    // Form state for new product
    const [showAddModal, setShowAddModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        category_id: 1, // Default
        image_url: '' // Will append to description
    });

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                // Find vendor's business first (assuming one business per vendor)
                // This is tricky because the backend Business model links to user_id.
                // We'll fetch all businesses and find match.
                const businessesRes = await api.get('/businesses');
                const myBusiness = businessesRes.data.find(b => b.user_id === user.user_id);

                if (myBusiness) {
                    setBusiness(myBusiness);
                    const productsRes = await api.get(`/products?business_id=${myBusiness.vendor_id}`);
                    setProducts(productsRes.data);
                }
            } catch (error) {
                console.error("Error fetching vendor data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchVendorData();
    }, [user]);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!business) return;

        try {
            const productData = {
                ...newProduct,
                price: parseFloat(newProduct.price),
                stock_quantity: parseInt(newProduct.stock_quantity),
                business_id: business.vendor_id,
                description: `${newProduct.description}${newProduct.image_url ? ` Image: ${newProduct.image_url}` : ''}`
            };

            const res = await api.post('/products', productData);
            setProducts([...products, res.data]);
            setShowAddModal(false);
            setNewProduct({ name: '', description: '', price: '', stock_quantity: '', category_id: 1, image_url: '' });
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product");
        }
    };

    if (loading) return <div>Loading dashboard...</div>;

    if (!business) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold mb-4">You haven't set up a business yet</h2>
                <button className="btn btn-primary">Create Business Profile</button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-serif">{business.business_name}</h1>
                    <p className="text-[var(--text-muted)]">Vendor Dashboard</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="btn btn-primary flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> Add Product
                </button>
            </div>

            <div className="bg-white rounded-lg border border-[var(--border)] overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-[var(--border)]">
                        <tr>
                            <th className="p-4 font-semibold">Product Name</th>
                            <th className="p-4 font-semibold">Price</th>
                            <th className="p-4 font-semibold">Stock</th>
                            <th className="p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.product_id} className="border-b border-[var(--border)] last:border-0 hover:bg-gray-50">
                                <td className="p-4 flex items-center gap-3">
                                    <div className="bg-gray-100 p-2 rounded">
                                        <Package className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <span className="font-medium">{product.name}</span>
                                </td>
                                <td className="p-4">KES {product.price}</td>
                                <td className="p-4">
                                    <span className={`badge ${product.stock_quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {product.stock_quantity}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button className="text-blue-600 hover:underline text-sm mr-3">Edit</button>
                                    <button className="text-red-600 hover:underline text-sm">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No products listed yet.
                    </div>
                )}
            </div>

            {/* Simple Modal for Add Product */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                        <form onSubmit={handleAddProduct} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="input"
                                value={newProduct.name}
                                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description"
                                className="input h-24 resize-none"
                                value={newProduct.description}
                                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    placeholder="Price"
                                    className="input"
                                    value={newProduct.price}
                                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                    required
                                />
                                <input
                                    type="number"
                                    placeholder="Stock Qty"
                                    className="input"
                                    value={newProduct.stock_quantity}
                                    onChange={e => setNewProduct({ ...newProduct, stock_quantity: e.target.value })}
                                    required
                                />
                            </div>
                            <input
                                type="url"
                                placeholder="Image URL (optional)"
                                className="input"
                                value={newProduct.image_url}
                                onChange={e => setNewProduct({ ...newProduct, image_url: e.target.value })}
                            />
                            <div className="flex gap-4 mt-6">
                                <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-secondary flex-1">Cancel</button>
                                <button type="submit" className="btn btn-primary flex-1">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorDashboard;
