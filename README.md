# Market Mtaani

Simple marketplace backend for the Mtaani market app.

Overview
--------
Market Mtaani is a Flask-based backend that models users, vendors, customers, products, orders and order items. It's intended as a small marketplace API used for teaching and prototyping.

Quickstart
Prerequisites: Python 3.8+, pipenv (recommended) or virtualenv

Clone:

	git clone https://github.com/Kemmytheboss/market_mtaani.git
	cd market_mtaani

Install dependencies (pipenv):

	pipenv install

Activate shell and run the app:

	pipenv run flask --app server.app run --host=0.0.0.0 --port=5000

Local development (recommended):
	# Create and activate virtualenv
	python3 -m venv .venv
	. .venv/bin/activate
	# Install dependencies
	pip install -r requirements.txt

	# Run migrations and seed (safe targets)
	make migrate
	make seed-dev

	# Run tests
	make test

	# Start the app
	export FLASK_APP=server.app
	flask run

Docker (reproducible dev):
	docker build -t market_mtaani:dev .
	docker run --rm -it market_mtaani:dev

Makefile targets:
	make venv        # create .venv
	make install     # install dependencies
	make migrate     # run migrations
	make seed-dev    # seed only if using sqlite DB
	make test        # run pytest
	make docker-build # build Docker image
	make clean       # remove .venv and market.db

Or run directly (if you prefer a virtualenv):

	python3 -m venv .venv
	. .venv/bin/activate
	pip install -r requirements.txt   # if you prepare requirements
	export FLASK_APP=server.app
	flask run

Database and seeds
This project uses Flask SQLAlchemy. A small seeding script is included at `server/seed.py` — run it to create example data (ensure your DB config is set in `server/app.py` or environment variables):

	python3 server/seed.py

This project uses Flask SQLAlchemy and Alembic migrations. To create and seed the database:

	make migrate
	make seed-dev

The seed script will only run if your `DATABASE_URL` is SQLite (default: `market.db`).

Models
------
- `server/models/users.py` — application users
- `server/models/vendors.py` — vendor profiles
- `server/models/customers.py` — customer profiles
- `server/models/products.py` — product catalog
- `server/models/order-items.py` — items attached to orders
- `server/models/orders.py` — (new) orders table and relationships

Development

Use the provided `Makefile` for common tasks.
Activate your virtualenv before running management scripts.
If you add new models, update `server/seed.py` and add tests in `tests/`.

Contributing
1. Fork and create a feature branch.
2. Make changes and include tests where appropriate.
3. Open a PR against `main` with a short description of the change.

See [CONTRIBUTING.md](CONTRIBUTING.md) for branch workflow, migration, and seed instructions.

License
-------
See the repository license (if any).

Next steps / TODO

Add API endpoints for orders and order-items.
Add more tests and CI.
