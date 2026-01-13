from flask import request
from flask_restful import Resource
from models import db, Order, customers

class Orders(Resource):
    def get(self):
        orders = Order.query.all()
        return [order.to_dict() for order in orders]

    def post(self):
        data = request.get_json()
        customer_id = data.get('customer_id')
        order_date = data.get('order_date')

        new_order = Order(customer_id=customer_id, order_date=order_date)
        db.session.add(new_order)
        db.session.commit()
        return new_order.to_dict(), 201