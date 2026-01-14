from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

from . import db


class Customer(db.Model, SerializerMixin):
    __tablename__ = 'customers'

    customer_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), unique=True, nullable=False)
    address = Column(String(500))
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship('User', back_populates='customer')
    orders = relationship('Order', back_populates='customer', cascade='all, delete-orphan')

    serialize_rules = ('-user.customer', '-orders.customer')

    @validates('address')
    def validate_address(self, key, address):
        return address or ''
