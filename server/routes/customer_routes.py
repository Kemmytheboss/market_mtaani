from flask import request, jsonify
from flask_restful import Resource
from models import db, Customer

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
    
    