SHELL := /bin/sh

.PHONY: venv install migrate seed-dev test docker-build clean

venv:
	python3 -m venv .venv

install: venv
	.venv/bin/python -m pip install --upgrade pip setuptools wheel
	.venv/bin/pip install -r requirements.txt

migrate: install
	@export FLASK_APP=server.app; \
	.venv/bin/flask db migrate -m "auto" || true; \
	.venv/bin/flask db upgrade || true

seed-dev: install
	@echo "Checking DATABASE_URL before seeding..."
	@case "$$DATABASE_URL" in \
		""|sqlite* ) echo "Seeding local sqlite DB..." ;; \
		* ) echo "Refusing to seed non-sqlite DATABASE_URL: $$DATABASE_URL"; exit 1 ;; \
	esac
	PYTHONPATH=. .venv/bin/python server/seed.py

test: install
	PYTHONPATH=. .venv/bin/pytest -q

docker-build:
	docker build -t market_mtaani:dev .

clean:
	rm -rf .venv market.db
