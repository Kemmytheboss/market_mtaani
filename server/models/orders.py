from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

from . import db


class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    order_id = Column(Integer, primary_key=True)
    customer_id = Column(Integer, ForeignKey('customers.customer_id'), nullable=False)
    order_type = Column(String(255), nullable=False)
    total_amount = Column(Numeric(10, 2), nullable=False)
    order_status = Column(String(255), nullable=False)
    payment_status = Column(String(255), nullable=False)
    payment_method = Column(String(255), nullable=False)
    transaction_reference = Column(String(255))
    delivery_address = Column(String(500), nullable=False)
    delivery_status = Column(String(255), nullable=False)
    order_date = Column(DateTime, default=datetime.utcnow, nullable=False)

    customer = relationship('Customer', back_populates='orders')
    order_items = relationship('OrderItem', back_populates='order', cascade='all, delete-orphan')

    serialize_rules = ('-customer.orders', '-order_items.order')

    def __repr__(self):
        return f'<Order {self.order_id}>'

