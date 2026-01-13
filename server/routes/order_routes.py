from flask import request, jsonify
from flask_restful import Resource
from models import db, Customer, Order

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
    
    