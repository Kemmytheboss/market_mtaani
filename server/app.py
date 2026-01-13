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

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/market_mtaani'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)

