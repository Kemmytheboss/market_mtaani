api.add_resource(Customers, '/customers')
api.add_resource(CustomerById, '/customers/<int:id>')

api.add_resource(Orders, '/orders')
api.add_resource(OrderById, '/orders/<int:id>')