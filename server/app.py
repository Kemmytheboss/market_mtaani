
import os
from flask import Flask

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

	return app


app = create_app()


if __name__ == '__main__':
	app.run(debug=True)
