from flask import request, make_response
from flask_restful import Resource
from models import db, Product

class Products(Resource):
    def get(self):
        business_id = request.args.get('business_id')
        min_price = request.args.get('min_price')
        max_price = request.args.get('max_price')

        q = Product.query

        if business_id:
            q = q.filter_by(business_id=business_id)
        if min_price and max_price:
            q = q.filter(Product.price.between(min_price, max_price))

        products = q.all()
        response_list = [product.to_dict() for product in products]

        return make_response(response_list, 200)

    def post(self):
        data = request.get_json()

        if not data:
            return make_response({"error": "No data provided"}, 400)

        required_fields = ['business_id', 'name', 'price']
        for field in required_fields:
            if field not in data:
                return make_response({"error": f"{field} is required"}, 400)

        new_product = Product(
            business_id=data['business_id'],
            category_id=data.get('category_id'),
            name=data['name'],
            price=data['price'],
            bulk_price=data.get('bulk_price'),
            min_bulk_quantity=data.get('min_bulk_quantity'),
            stock_quantity=data.get('stock_quantity')
        )

        db.session.add(new_product)
        db.session.commit()

        return make_response(new_product.to_dict(), 201)


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

        for key, value in data.items():
            setattr(product, key, value)

        db.session.commit()
        return make_response(product.to_dict(), 200)

    def delete(self, id):
        product = Product.query.filter_by(product_id=id).first()
        if not product:
            return make_response({"error": "Product not found"}, 404)

        db.session.delete(product)
        db.session.commit()
        return make_response({"message": "Product deleted"}, 200)
