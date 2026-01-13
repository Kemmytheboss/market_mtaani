from flask import Flask
from flask_restful import Api
from flask_migrate import Migrate
from models import db

from routes.order_item_routes import(
    OrderItems,
    OrderItemById, 
    OrderItemsByOrderId
)

app = Flask(__name__)

# basic configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/market_mtaani'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)

# order item crud
api.add_resource(OrderItems, '/order_items')
api.add_resource(OrderItemById, '/order_items/<int:id>')

# nested order-items
api.add_resource(BusinessTotalRevenue, '/businesses/total_revenue')

# aggregate endpoints can be added here
api.add_resource(OrderItemsByOrderId, '/orders/<int:order_id>/order_items')

api.add_resource(ProductTotalSales, '/products/total_sales' )

if __name__ == '__main__':
    app.run(debug=True)