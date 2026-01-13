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