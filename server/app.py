#!/usr/bin/env python3
# server/app.py

from flask import Flask, request, make_response, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from models import db, User, Customer, Order, Product, Business, OrderItem
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

# ============================================
# Index Route
# ============================================
class Index(Resource):
    def get(self):
        response_dict = {
            "message": "Welcome to the Market Mtaani API",
        }
        return make_response(response_dict, 200)

api.add_resource(Index, '/')

# ============================================
# User Routes
# ============================================
class Users(Resource):
    def get(self):
        role = request.args.get('role')
        
        if role:
            users = User.query.filter_by(role=role).all()
        else:
            users = User.query.all()
        
        response_dict_list = [user.to_dict() for user in users]
        return make_response(response_dict_list, 200)
    
    def post(self):
        data = request.get_json()
        
        if not data:
            return make_response({"error": "No data provided"}, 400)
        
        if 'full_name' not in data or not data['full_name']:
            return make_response({"error": "full_name is required"}, 400)
        
        if 'email' not in data or not data['email']:
            return make_response({"error": "email is required"}, 400)
        
        if 'password' not in data or not data['password']:
            return make_response({"error": "password is required"}, 400)
        
        new_user = User(
            full_name=data['full_name'],
            email=data['email'],
            password=data['password'],
            phone=data.get('phone'),
            role=data.get('role'),
            status=data.get('status')
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return make_response(new_user.to_dict(), 201)

api.add_resource(Users, '/users')

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(user_id=id).first()
        
        if not user:
            return make_response({"error": "User not found"}, 404)
        
        return make_response(user.to_dict(), 200)
    
    def patch(self, id):
        user = User.query.filter_by(user_id=id).first()
        
        if not user:
            return make_response({"error": "User not found"}, 404)
        
        data = request.get_json()
        
        if not data:
            return make_response({"error": "No data provided"}, 400)
        
        allowed_fields = ['full_name', 'email', 'password', 'phone', 'role', 'status']
        
        for key, value in data.items():
            if key in allowed_fields:
                setattr(user, key, value)
        
        db.session.add(user)
        db.session.commit()
        
        return make_response(user.to_dict(), 200)
    
    def delete(self, id):
        user = User.query.filter_by(user_id=id).first()
        
        if not user:
            return make_response({"error": "User not found"}, 404)
        
        db.session.delete(user)
        db.session.commit()
        
        return make_response({"message": "User successfully deleted"}, 200)

api.add_resource(UserByID, '/users/<int:id>')

# ============================================
# Customer Routes
# ============================================
VALID_CUSTOMER_TYPES = ["WHOLESALER", "RETAILER"]

class Customers(Resource):
    def get(self):
        customers = Customer.query.all()
        return make_response([customer.to_dict() for customer in customers], 200)
    
    def post(self):
        data = request.get_json()
        
        if not data:
            return make_response({"error": "No data provided"}, 400)
        
        user_id = data.get('user_id')
        customer_type = data.get('customer_type')
        
        if not user_id:
            return make_response({"error": "user_id is required"}, 400)
        
        if customer_type not in VALID_CUSTOMER_TYPES:
            return make_response(
                {"error": "Invalid customer type. Must be WHOLESALER or RETAILER."},
                400
            )
        
        new_customer = Customer(
            user_id=user_id,
            customer_type=customer_type,
            business_name=data.get('business_name')
        )
        
        db.session.add(new_customer)
        db.session.commit()
        
        return make_response(new_customer.to_dict(), 201)

api.add_resource(Customers, '/customers')

class CustomerById(Resource):
    def get(self, id):
        customer = Customer.query.filter_by(customer_id=id).first()
        
        if not customer:
            return make_response({"error": "Customer not found"}, 404)
        
        return make_response(customer.to_dict(), 200)
    
    def patch(self, id):
        customer = Customer.query.filter_by(customer_id=id).first()
        
        if not customer:
            return make_response({"error": "Customer not found"}, 404)
        
        data = request.get_json()
        
        if not data:
            return make_response({"error": "No data provided"}, 400)
        
        customer_type = data.get('customer_type')
        
        if customer_type and customer_type not in VALID_CUSTOMER_TYPES:
            return make_response(
                {"error": "Invalid customer type. Must be WHOLESALER or RETAILER."},
                400
            )
        
        if customer_type:
            customer.customer_type = customer_type
        
        if 'business_name' in data:
            customer.business_name = data['business_name']
        
        db.session.commit()
        
        return make_response(customer.to_dict(), 200)
    
    def delete(self, id):
        customer = Customer.query.filter_by(customer_id=id).first()
        
        if not customer:
            return make_response({"error": "Customer not found"}, 404)
        
        db.session.delete(customer)
        db.session.commit()
        
        return make_response({"message": "Customer successfully deleted"}, 200)

api.add_resource(CustomerById, '/customers/<int:id>')

# ============================================
# Product Routes
# ============================================
class Products(Resource):
    def get(self):
        business_id = request.args.get('business_id')
        
        if business_id:
            products = Product.query.filter_by(business_id=business_id).all()
        else:
            products = Product.query.all()
        
        return make_response([product.to_dict() for product in products], 200)
    
    def post(self):
        data = request.get_json()
        
        if not data:
            return make_response({"error": "No data provided"}, 400)
        
        required_fields = ["name", "price", "business_id"]
        for field in required_fields:
            if field not in data or data[field] is None:
                return make_response({"error": f"{field} is required"}, 400)
        
        try:
            new_product = Product(
                name=data["name"],
                price=data["price"],
                business_id=data["business_id"],
                description=data.get("description"),
                stock_quantity=data.get("stock_quantity", 0),
                bulk_price=data.get("bulk_price"),
                min_bulk_quantity=data.get("min_bulk_quantity"),
                category_id=data.get("category_id")
            )
            db.session.add(new_product)
            db.session.commit()
            return make_response(new_product.to_dict(), 201)
        except IntegrityError:
            db.session.rollback()
            return make_response({"error": "Invalid business_id or product data"}, 400)

api.add_resource(Products, '/products')

class ProductByID(Resource):
    def get(self, id):
        product = Product.query.filter_by(product_id=id).first()
        
        if not product:
            return make_response({"error": "Product not found"}, 404)
        
        return make_response(product.to_dict(), 200)
    
    def patch(self, id):
        product = Product.query.filter_by(product_id=id).first()
        
        if not product:
            return make_response({"error": "Product not found"}, 404)
        
        data = request.get_json()
        
        if not data:
            return make_response({"error": "No data provided"}, 400)
        
        allowed_fields = ["name", "price", "description", "stock_quantity", 
                         "bulk_price", "min_bulk_quantity", "category_id"]
        
        for key, value in data.items():
            if key in allowed_fields:
                setattr(product, key, value)
        
        db.session.commit()
        
        return make_response(product.to_dict(), 200)
    
    def delete(self, id):
        product = Product.query.filter_by(product_id=id).first()
        
        if not product:
            return make_response({"error": "Product not found"}, 404)
        
        db.session.delete(product)
        db.session.commit()
        
        return make_response({"message": "Product deleted successfully"}, 200)

api.add_resource(ProductByID, '/products/<int:id>')

# ============================================
# Business Routes
# ============================================
class Businesses(Resource):
    def get(self):
        verification_status = request.args.get('verification_status')
        
        if verification_status:
            businesses = Business.query.filter_by(verification_status=verification_status).all()
        else:
            businesses = Business.query.all()
        
        return make_response([business.to_dict() for business in businesses], 200)
    
    def post(self):
        data = request.get_json()
        
        if not data:
            return make_response({"error": "No data provided"}, 400)
        
        if not data.get("business_name"):
            return make_response({"error": "business_name is required"}, 400)
        
        if not data.get("user_id"):
            return make_response({"error": "user_id is required"}, 400)
        
        try:
            new_business = Business(
                business_name=data["business_name"],
                user_id=data["user_id"],
                verification_status=data.get("verification_status", "pending"),
                rating=data.get("rating")
            )
            db.session.add(new_business)
            db.session.commit()
            return make_response(new_business.to_dict(), 201)
        except IntegrityError:
            db.session.rollback()
            return make_response({"error": "Invalid user_id or duplicate business"}, 400)

api.add_resource(Businesses, '/businesses')

class BusinessById(Resource):
    def get(self, id):
        business = Business.query.filter_by(vendor_id=id).first()
        
        if not business:
            return make_response({"error": "Business not found"}, 404)
        
        return make_response(business.to_dict(), 200)
    
    def patch(self, id):
        business = Business.query.filter_by(vendor_id=id).first()
        
        if not business:
            return make_response({"error": "Business not found"}, 404)
        
        data = request.get_json()
        
        if not data:
            return make_response({"error": "No data provided"}, 400)
        
        allowed_fields = ["business_name", "verification_status", "rating"]
        
        for key, value in data.items():
            if key in allowed_fields:
                setattr(business, key, value)
        
        db.session.commit()
        
        return make_response(business.to_dict(), 200)
    
    def delete(self, id):
        business = Business.query.filter_by(vendor_id=id).first()
        
        if not business:
            return make_response({"error": "Business not found"}, 404)
        
        db.session.delete(business)
        db.session.commit()
        
        return make_response({"message": "Business deleted successfully"}, 200)

api.add_resource(BusinessById, '/businesses/<int:id>')

# ============================================
# Order Routes
# ============================================
class Orders(Resource):
    def get(self):
        customer_id = request.args.get('customer_id')
        order_status = request.args.get('order_status')
        
        query = Order.query
        
        if customer_id:
            query = query.filter_by(customer_id=customer_id)
        if order_status:
            query = query.filter_by(order_status=order_status)
        
        return make_response([order.to_dict() for order in query.all()], 200)
    
    def post(self):
        data = request.get_json()
        
        if not data:
            return make_response({"error": "No data provided"}, 400)
        
        customer_id = data.get('customer_id')
        total_amount = data.get('total_amount')
        
        if not customer_id:
            return make_response({"error": "customer_id is required"}, 400)
        
        if not total_amount:
            return make_response({"error": "total_amount is required"}, 400)
        
        customer = Customer.query.filter_by(customer_id=customer_id).first()
        if not customer:
            return make_response({"error": "Customer not found"}, 404)
        
        try:
            new_order = Order(
                customer_id=customer_id,
                total_amount=total_amount,
                order_type=data.get('order_type'),
                order_status=data.get('order_status', 'pending'),
                payment_status=data.get('payment_status', 'unpaid'),
                payment_method=data.get('payment_method'),
                transaction_reference=data.get('transaction_reference'),
                delivery_address=data.get('delivery_address'),
                delivery_status=data.get('delivery_status', 'not_shipped')
            )
            db.session.add(new_order)
            db.session.commit()
            return make_response(new_order.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 400)

api.add_resource(Orders, '/orders')

class OrderById(Resource):
    def get(self, id):
        order = Order.query.filter_by(order_id=id).first()
        
        if not order:
            return make_response({"error": "Order not found"}, 404)
        
        return make_response(order.to_dict(), 200)
    
    def patch(self, id):
        order = Order.query.filter_by(order_id=id).first()
        
        if not order:
            return make_response({"error": "Order not found"}, 404)
        
        data = request.get_json()
        
        if not data:
            return make_response({"error": "No data provided"}, 400)
        
        allowed_fields = ['order_status', 'payment_status', 'payment_method', 
                         'transaction_reference', 'delivery_address', 'delivery_status',
                         'total_amount', 'order_type']
        
        for key, value in data.items():
            if key in allowed_fields:
                setattr(order, key, value)
        
        try:
            db.session.commit()
            return make_response(order.to_dict(), 200)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 400)
    
    def delete(self, id):
        order = Order.query.filter_by(order_id=id).first()
        
        if not order:
            return make_response({"error": "Order not found"}, 404)
        
        try:
            db.session.delete(order)
            db.session.commit()
            return make_response({"message": "Order successfully deleted"}, 200)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 400)

api.add_resource(OrderById, '/orders/<int:id>')

# ============================================
# OrderItem Routes 
# ============================================
class OrderItems(Resource):
    def get(self):
        order_id = request.args.get('order_id')
        product_id = request.args.get('product_id')
        
        query = OrderItem.query
        
        if order_id:
            query = query.filter_by(order_id=order_id)
        if product_id:
            query = query.filter_by(product_id=product_id)
        
        return make_response([item.to_dict() for item in query.all()], 200)
    
    def post(self):
        data = request.get_json()
        
        if not data:
            return make_response({"error": "No data provided"}, 400)
        
        required_fields = ["order_id", "product_id", "quantity", "unit_price"]
        for field in required_fields:
            if field not in data or data[field] is None:
                return make_response({"error": f"{field} is required"}, 400)
        
        order = Order.query.filter_by(order_id=data['order_id']).first()
        if not order:
            return make_response({"error": "Order not found"}, 404)
        
        product = Product.query.filter_by(product_id=data['product_id']).first()
        if not product:
            return make_response({"error": "Product not found"}, 404)
        
        try:
            new_order_item = OrderItem(
                order_id=data['order_id'],
                product_id=data['product_id'],
                quantity=data['quantity'],
                unit_price=data['unit_price']
            )
            db.session.add(new_order_item)
            db.session.commit()
            return make_response(new_order_item.to_dict(), 201)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 400)

api.add_resource(OrderItems, '/order_items')

class OrderItemById(Resource):
    def get(self, id):
        order_item = OrderItem.query.filter_by(order_item_id=id).first()
        
        if not order_item:
            return make_response({"error": "Order item not found"}, 404)
        
        return make_response(order_item.to_dict(), 200)
    
    def patch(self, id):
        order_item = OrderItem.query.filter_by(order_item_id=id).first()
        
        if not order_item:
            return make_response({"error": "Order item not found"}, 404)
        
        data = request.get_json()
        
        if not data:
            return make_response({"error": "No data provided"}, 400)
        
        allowed_fields = ['quantity', 'unit_price']
        
        for key, value in data.items():
            if key in allowed_fields:
                setattr(order_item, key, value)
        
        try:
            db.session.commit()
            return make_response(order_item.to_dict(), 200)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 400)
    
    def delete(self, id):
        order_item = OrderItem.query.filter_by(order_item_id=id).first()
        
        if not order_item:
            return make_response({"error": "Order item not found"}, 404)
        
        try:
            db.session.delete(order_item)
            db.session.commit()
            return make_response({"message": "Order item successfully deleted"}, 200)
        except Exception as e:
            db.session.rollback()
            return make_response({"error": str(e)}, 400)

api.add_resource(OrderItemById, '/order_items/<int:id>')

class OrderItemsByOrder(Resource):
    def get(self, order_id):
        order = Order.query.filter_by(order_id=order_id).first()
        
        if not order:
            return make_response({"error": "Order not found"}, 404)
        
        order_items = OrderItem.query.filter_by(order_id=order_id).all()
        
        return make_response([item.to_dict() for item in order_items], 200)

api.add_resource(OrderItemsByOrder, '/orders/<int:order_id>/items')

# ============================================
# Run Application
# ============================================
if __name__ == '__main__':
    app.run(port=5555, debug=True)