from flask import Flask
from flask_restful import Api
from app.routes.businesses import Businesses, BusinessByID
from app.routes.products import Products, ProductByID
from app.extensions import db, migrate

def create_app():
    app = Flask(__name__)

    # Initialize app configuration
    app.config.from_object("config.Config")

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Create Api instance and register resources
    api = Api(app)

    api.add_resource(Businesses, "/businesses")
    api.add_resource(BusinessByID, "/businesses/<int:id>")

    api.add_resource(Products, "/products")
    api.add_resource(ProductByID, "/products/<int:id>")

    return app
