import os
from flask import Flask
from flask_cors import CORS
from flask_restful import Api

from server.models import db

try:
    from flask_migrate import Migrate
except Exception:
    Migrate = None


def create_app(config_object=None):
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///market.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    if Migrate is not None:
        Migrate(app, db)

    
    CORS(app)

    
    api = Api(app)

    from server.routes.customer_routes import Customers
    from server.routes.order_routes import Orders
    from server.routes.products import Products
    from server.routes.user_routes import Users

   
    api.add_resource(Customers, '/customers')
    api.add_resource(Orders, '/orders')
    api.add_resource(Products, '/products')
    api.add_resource(Users, '/users')

    return app


app = create_app()


@app.route('/')
def index():
    return {"message": "Welcome to Market Mtaani API"}


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)