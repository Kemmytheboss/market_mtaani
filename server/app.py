# server/routes/user_routes.py
from flask import Flask
from flask import request, make_response, jsonify
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, User, Customer, Order, Product, Business
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

class Index(Resource):
    def get(self):
        response_dict = {
            "message": "Welcome to the Market Mtaani API",
        }
        response = make_response(response_dict, 200)
        return response

api.add_resource(Index, '/')

class Users(Resource):
    
    def get(self):
        role = request.args.get('role')
        
        if role:
            users = User.query.filter_by(role=role).all()
        else:
            users = User.query.all()
        
        response_dict_list = [user.to_dict() for user in users]
        
        response = make_response(
            response_dict_list,
            200
        )
        
        return response
    
    def post(self):
        data = request.get_json()
        
        if not data:
            response = make_response(
                {"error": "No data provided"},
                400
            )
            return response
        
        if 'full_name' not in data or not data['full_name']:
            response = make_response(
                {"error": "full_name is required"},
                400
            )
            return response
        
        if 'email' not in data or not data['email']:
            response = make_response(
                {"error": "email is required"},
                400
            )
            return response
        
        if 'password' not in data or not data['password']:
            response = make_response(
                {"error": "password is required"},
                400
            )
            return response
        
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
        
        response_dict = new_user.to_dict()
        
        response = make_response(
            response_dict,
            201
        )
        
        return response

api.add_resource(Users, '/users')

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(user_id=id).first()
        
        if not user:
            response = make_response(
                {"error": "User not found"},
                404
            )
            return response
        
        response_dict = user.to_dict()
        
        response = make_response(
            response_dict,
            200
        )
        
        return response
    
    def patch(self, id):
        user = User.query.filter_by(user_id=id).first()
        
        if not user:
            response = make_response(
                {"error": "User not found"},
                404
            )
            return response
        
        data = request.get_json()
        
        if not data:
            response = make_response(
                {"error": "No data provided"},
                400
            )
            return response
        
        allowed_fields = ['full_name', 'email', 'password', 'phone', 'role', 'status']
        
        for key, value in data.items():
            if key in allowed_fields:
                setattr(user, key, value)
        
        db.session.add(user)
        db.session.commit()
        
        response_dict = user.to_dict()
        
        response = make_response(
            response_dict,
            200
        )
        
        return response
    
    def delete(self, id):
        user = User.query.filter_by(user_id=id).first()
        
        if not user:
            response = make_response(
                {"error": "User not found"},
                404
            )
            return response
        
        db.session.delete(user)
        db.session.commit()
        
        response_dict = {"message": "User successfully deleted"}
        
        response = make_response(
            response_dict,
            200
        )
        
        return response

api.add_resource(UserByID, '/users/<int:id>')

VALID_CUSTOMER_TYPES = ["WHOLESALER", "RETAILER"]

class Customers(Resource):
    def get(self):
        customers = Customer.query.all()
        return jsonify([customer.to_dict() for customer in customers])

    def post(self):
        data = request.get_json()
        name = data.get('name')
        customer_type = data.get('customer_type')

        if customer_type not in VALID_CUSTOMER_TYPES:
            return {"error": "Invalid customer type. Must be WHOLESALER or RETAILER."}, 400

        new_customer = Customer(name=name, customer_type=customer_type)
        db.session.add(new_customer)
        db.session.commit()
        return jsonify(new_customer.to_dict()), 201

api.add_resource(Customers, '/customers')
    
class CustomerById(Resource):
        def get(self, id):
            customer = Customer.query.get_or_404(id)
            return jsonify(customer.to_dict())

        def patch(self, id):
            customer = Customer.query.get_or_404(id)
            data = request.get_json()
            name = data.get('name')
            customer_type = data.get('customer_type')

            if customer_type and customer_type not in VALID_CUSTOMER_TYPES:
                return {"error": "Invalid customer type. Must be WHOLESALER or RETAILER."}, 400

            if name:
                customer.name = name
            if customer_type:
                customer.customer_type = customer_type

            db.session.commit()
            return jsonify(customer.to_dict())

        def delete(self, id):
            customer = Customer.query.get_or_404(id)
            db.session.delete(customer)
            db.session.commit()
            return '', 204

api.add_resource(Customers.CustomerById, '/customers/<int:id>')

class Products(Resource):

    def get(self):
        business_id = request.args.get('business_id')

        if business_id:
            products = Product.query.filter_by(business_id=business_id).all()
        else:
            products = Product.query.all()

        return make_response(
            [product.to_dict() for product in products],
            200
        )

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
                description=data.get("description")
            )

            db.session.add(new_product)
            db.session.commit()

            return make_response(new_product.to_dict(), 201)

        except IntegrityError:
            db.session.rollback()
            return make_response(
                {"error": "Invalid business_id or product data"},
                400
            )

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

        allowed_fields = ["name", "price", "description"]

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

class Orders(Resource):
    def get(self):
        customer_id = request.args.get('customer_id')
        status = request.args.get('status')

        query = Order.query

        if customer_id:
            query = query.filter_by(customer_id=customer_id)
        if status:
            query = query.filter_by(status=status)
        return jsonify([order.to_dict() for order in query.all()])
    
    def post(self):
        data  = request.get_json()

        customer = Customer.query.get(data.get('customer_id'))

        if not customer:
            return {"error": "Customer not found."}, 404
        
        new_order = Order(
            customer_id=data.get('customer_id'),
            status=data.get('status', 'PENDING'))
        
        try: 
            db.session.add(new_order)
            db.session.commit()
            return jsonify(new_order.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400

api.add_resource(Orders, '/orders')

class OrderById(Resource):
    def get(self, id):
        order = Order.query.get_or_404(id)
        return jsonify(order.to_dict())

    def patch(self, id):
        order = Order.query.get_or_404(id)
        data = request.get_json()

        status = data.get('status')
        if status:
            order.status = status

        try:
            db.session.commit()
            return jsonify(order.to_dict())
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400

    def delete(self, id):
        order = Order.query.get_or_404(id)
        try:
            db.session.delete(order)
            db.session.commit()
            return '', 204
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400

api.add_resource(OrderById, '/orders/<int:id>')

class Businesses(Resource):

    def get(self):
        status = request.args.get('verification_status')

        if status:
            businesses = Business.query.filter_by(verification_status=status).all()
        else:
            businesses = Business.query.all()

        response = make_response(
            [business.to_dict() for business in businesses],
            200
        )
        return response

    def post(self):
        data = request.get_json()

        if not data:
            return make_response({"error": "No data provided"}, 400)

        if not data.get("name"):
            return make_response({"error": "name is required"}, 400)

        if not data.get("owner_id"):
            return make_response({"error": "owner_id is required"}, 400)

        try:
            new_business = Business(
                name=data["name"],
                owner_id=data["owner_id"],
                verification_status=data.get("verification_status", "pending")
            )

            db.session.add(new_business)
            db.session.commit()

            return make_response(new_business.to_dict(), 201)

        except IntegrityError:
            db.session.rollback()
            return make_response({"error": "Invalid owner_id or duplicate business"}, 400)
        
    def get(self, id):
        business = Business.query.filter_by(business_id=id).first()

        if not business:
            return make_response({"error": "Business not found"}, 404)

        return make_response(business.to_dict(), 200)

    def patch(self, id):
        business = Business.query.filter_by(business_id=id).first()

        if not business:
            return make_response({"error": "Business not found"}, 404)

        data = request.get_json()
        if not data:
            return make_response({"error": "No data provided"}, 400)

        allowed_fields = ["name", "verification_status"]

        for key, value in data.items():
            if key in allowed_fields:
                setattr(business, key, value)

        db.session.commit()
        return make_response(business.to_dict(), 200)

    def delete(self, id):
        business = Business.query.filter_by(business_id=id).first()

        if not business:
            return make_response({"error": "Business not found"}, 404)

        db.session.delete(business)
        db.session.commit()
        
        return make_response({"message": "Business deleted successfully"}, 200)

api.add_resource(Businesses, '/businesses')
api.add_resource(Businesses, '/businesses/<int:id>')

if __name__ == '__main__':
	app.run(debug=True)