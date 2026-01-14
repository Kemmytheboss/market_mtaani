#!/usr/bin/env python3

from flask import Flask
from flask_migrate import Migrate
from flask_restful import Api
from config import Config
from models import db

from routes.user_routes import Users, UserByID

app = Flask(__name__)
app.config.from_object(Config)

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

# register User routes
api.add_resource(Users, '/users')
api.add_resource(UserByID, '/users/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)