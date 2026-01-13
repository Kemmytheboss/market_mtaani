from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric
from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

from . import db


class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    product_id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Numeric(10, 2), nullable=False)
    stock = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    vendor_id = Column(Integer, ForeignKey('vendors.vendor_id'), nullable=False)

    vendor = relationship('Vendor', back_populates='products')
    order_items = relationship('OrderItem', back_populates='product', cascade='all, delete-orphan')

    serialize_rules = ('-vendor.products', '-order_items.product')

    @validates('price')
    def validate_price(self, key, price):
        if price is None or float(price) < 0:
            raise ValueError('Price must be non-negative')
        return price

    @validates('stock')
    def validate_stock(self, key, stock):
        if stock is None or int(stock) < 0:
            raise ValueError('Stock must be non-negative')
        return stock
from sqlalchemy import MetaData, Column, Integer, String, DateTime, ForeignKey

