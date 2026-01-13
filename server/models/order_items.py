from sqlalchemy import Column, Integer, ForeignKey, Numeric
from sqlalchemy.orm import relationship, validates

from . import db


class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey('orders.order_id'), nullable=False)
    product_id = Column(Integer, ForeignKey('products.product_id'), nullable=False)
    quantity = Column(Integer, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)

    order = relationship('Order', back_populates='order_items')
    product = relationship('Product', back_populates='order_items')

    @validates('quantity')
    def validate_quantity(self, key, quantity):
        if quantity is None or int(quantity) < 1:
            raise ValueError('quantity must be >= 1')
        return int(quantity)

    @validates('price')
    def validate_price(self, key, price):
        if price is None or float(price) < 0:
            raise ValueError('price must be non-negative')
        return price
