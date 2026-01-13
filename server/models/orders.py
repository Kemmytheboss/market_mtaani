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
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Order(db.Model):
    __tablename__ = 'orders'

    order_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    order_type = db.Column(db.String(255), nullable=False)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    order_status = db.Column(db.String(255), nullable=False)
    payment_status = db.Column(db.String(255), nullable=False)
    payment_method = db.Column(db.String(255), nullable=False)
    transaction_reference = db.Column(db.String(255))
    delivery_address = db.Column(db.String(500), nullable=False)
    delivery_status = db.Column(db.String(255), nullable=False)
    order_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    # Relationships
    customer = db.relationship('Customer', backref='orders')
    order_items = db.relationship('OrderItem', backref='order', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Order {self.order_id}>'

    def to_dict(self):
        return {
            'order_id': self.order_id,
            'customer_id': self.customer_id,
            'order_type': self.order_type,
            'total_amount': float(self.total_amount),
            'order_status': self.order_status,
            'payment_status': self.payment_status,
            'payment_method': self.payment_method,
            'transaction_reference': self.transaction_reference,
            'delivery_address': self.delivery_address,
            'delivery_status': self.delivery_status,
            'order_date': self.order_date.isoformat() if self.order_date else None
        }
