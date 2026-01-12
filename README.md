# Market Mtaani

Simple marketplace backend for the Mtaani market app.

Overview
--------
Market Mtaani is a Flask-based backend that models users, vendors, customers, products, orders and order items. It's intended as a small marketplace API used for teaching and prototyping.

Quickstart
----------
Prerequisites: Python 3.8+, pipenv (recommended) or virtualenv

Clone:

	git clone https://github.com/Kemmytheboss/market_mtaani.git
	cd market_mtaani

Install dependencies (pipenv):

	pipenv install

Activate shell and run the app:

	pipenv run flask --app server.app run --host=0.0.0.0 --port=5000

Or run directly (if you prefer a virtualenv):

	python3 -m venv .venv
	. .venv/bin/activate
	pip install -r requirements.txt   # if you prepare requirements
	export FLASK_APP=server.app
	flask run

Database and seeds
------------------
This project uses Flask SQLAlchemy. A small seeding script is included at `server/seed.py` — run it to create example data (ensure your DB config is set in `server/app.py` or environment variables):

	python3 server/seed.py

Models
------
- `server/models/users.py` — application users
- `server/models/vendors.py` — vendor profiles
- `server/models/customers.py` — customer profiles
- `server/models/products.py` — product catalog
- `server/models/order-items.py` — items attached to orders
- `server/models/orders.py` — (new) orders table and relationships

Development
-----------
- Use `pipenv run` or activate your virtualenv before running management scripts.
- If you add new models, keep `server/seed.py` updated with sample data.

Contributing
------------
1. Fork and create a feature branch.
2. Make changes and include tests where appropriate.
3. Open a PR against `main` with a short description of the change.

License
-------
See the repository license (if any).

Next steps / TODO
-----------------
- Add migrations with Flask-Migrate.
- Add API endpoints for orders and order-items.
- Add tests and CI.
