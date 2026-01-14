import os
import importlib
import pytest

# Ensure tests use an in-memory SQLite DB
os.environ['DATABASE_URL'] = 'sqlite:///:memory:'

from server.app import create_app
from server.models import db, User, Product, OrderItem


@pytest.fixture
def app():
    app = create_app()
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()


def test_user_password_hashing(app):
    u = User(full_name='Test User', email='test@example.com')
    u.set_password('s3cret')
    assert u.check_password('s3cret')
    assert not u.check_password('wrong')


def test_user_full_name_validation(app):
    with pytest.raises(ValueError):
        User(full_name='   ', email='a@b.com')


def test_product_price_validation(app):
    with pytest.raises(ValueError):
        Product(name='P', price=-1, stock=1, vendor_id=1)


def test_order_item_validations(app):
    oi = OrderItem(quantity=1, price=1)
    assert oi.quantity == 1
    with pytest.raises(ValueError):
        OrderItem(quantity=0, price=1)
    with pytest.raises(ValueError):
        OrderItem(quantity=1, price=-1)
