from flask import request, make_response
from flask_restful import Resource
from models import db, Product
from sqlalchemy.exc import IntegrityError

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
