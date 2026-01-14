api.add_resource(Customers, '/customers')
api.add_resource(CustomerById, '/customers/<int:id>')

api.add_resource(Orders, '/orders')
api.add_resource(OrderById, '/orders/<int:id>')

from resources.business import Businesses, BusinessByID
from resources.products import Products, ProductByID


api.add_resource(Businesses, "/businesses")
api.add_resource(BusinessByID, "/businesses/<int:id>")

api.add_resource(Products, "/products")
api.add_resource(ProductByID, "/products/<int:id>")
