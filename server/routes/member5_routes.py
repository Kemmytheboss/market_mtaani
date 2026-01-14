from flask import Blueprint, request, jsonify
from sqlalchemy import func
from models import db, Order, OrderItem, Product, Business

# =====================================================
# Blueprint
# =====================================================

member5_bp = Blueprint('member5_bp', __name__)

# =====================================================
# OrderItem CRUD
# =====================================================

@member5_bp.route('/order_items', methods=['POST'])
def create_order_item():
    data = request.get_json()

    if not data:
        return jsonify({'error': 'Request body required'}), 400

    required_fields = ['order_id', 'product_id', 'quantity', 'unit_price']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    order = Order.query.get(data['order_id'])
    product = Product.query.get(data['product_id'])

    if not order or not product:
        return jsonify({'error': 'Invalid order_id or product_id'}), 404

    if data['quantity'] <= 0:
        return jsonify({'error': 'Quantity must be greater than zero'}), 400

    order_item = OrderItem(
        order_id=data['order_id'],
        product_id=data['product_id'],
        quantity=data['quantity'],
        unit_price=data['unit_price']
    )

    try:
        db.session.add(order_item)
        db.session.commit()
        return jsonify(order_item.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@member5_bp.route('/order_items', methods=['GET'])
def get_order_items():
    product_id = request.args.get('product_id')

    query = OrderItem.query
    if product_id:
        query = query.filter_by(product_id=product_id)

    return jsonify([item.to_dict() for item in query.all()]), 200


@member5_bp.route('/order_items/<int:item_id>', methods=['GET'])
def get_order_item(item_id):
    item = OrderItem.query.get(item_id)
    if not item:
        return jsonify({'error': 'OrderItem not found'}), 404
    return jsonify(item.to_dict()), 200


@member5_bp.route('/order_items/<int:item_id>', methods=['PATCH'])
def update_order_item(item_id):
    item = OrderItem.query.get(item_id)
    if not item:
        return jsonify({'error': 'OrderItem not found'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body required'}), 400

    if 'quantity' in data:
        if data['quantity'] <= 0:
            return jsonify({'error': 'Quantity must be greater than zero'}), 400
        item.quantity = data['quantity']

    if 'unit_price' in data:
        item.unit_price = data['unit_price']

    try:
        db.session.commit()
        return jsonify(item.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@member5_bp.route('/order_items/<int:item_id>', methods=['DELETE'])
def delete_order_item(item_id):
    item = OrderItem.query.get(item_id)
    if not item:
        return jsonify({'error': 'OrderItem not found'}), 404

    try:
        db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'OrderItem deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# =====================================================
# Nested Routes: Orders → OrderItems
# =====================================================

@member5_bp.route('/orders/<int:order_id>/items', methods=['GET'])
def get_items_for_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    items = OrderItem.query.filter_by(order_id=order_id).all()
    return jsonify([item.to_dict() for item in items]), 200


@member5_bp.route('/orders/<int:order_id>/items', methods=['POST'])
def add_item_to_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404

    data = request.get_json()
    if not data:
        return jsonify({'error': 'Request body required'}), 400

    product = Product.query.get(data.get('product_id'))
    if not product:
        return jsonify({'error': 'Invalid product_id'}), 404

    if data.get('quantity', 0) <= 0:
        return jsonify({'error': 'Quantity must be greater than zero'}), 400

    item = OrderItem(
        order_id=order_id,
        product_id=product.product_id,
        quantity=data['quantity'],
        unit_price=data['unit_price']
    )

    try:
        db.session.add(item)
        db.session.commit()
        return jsonify(item.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# =====================================================
# Complex Filtering
# =====================================================

@member5_bp.route('/products', methods=['GET'])
def filter_products_by_price():
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)

    query = Product.query
    if min_price is not None:
        query = query.filter(Product.price >= min_price)
    if max_price is not None:
        query = query.filter(Product.price <= max_price)

    return jsonify([product.to_dict() for product in query.all()]), 200


# =====================================================
# Aggregation Endpoints
# =====================================================

@member5_bp.route('/businesses/<int:business_id>/total_revenue', methods=['GET'])
def get_business_total_revenue(business_id):
    business = Business.query.get(business_id)
    if not business:
        return jsonify({'error': 'Business not found'}), 404

    revenue = db.session.query(
        func.sum(OrderItem.quantity * OrderItem.unit_price)
    ).join(Product).filter(
        Product.business_id == business_id
    ).scalar() or 0

    return jsonify({
        'business_id': business_id,
        'total_revenue': float(revenue)
    }), 200


@member5_bp.route('/products/<int:product_id>/total_sold', methods=['GET'])
def get_product_total_sold(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    total_sold = db.session.query(
        func.sum(OrderItem.quantity)
    ).filter(OrderItem.product_id == product_id).scalar() or 0

    return jsonify({
        'product_id': product_id,
        'total_units_sold': int(total_sold)
    }), 200
