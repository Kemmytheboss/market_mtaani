from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

from . import db


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    phone = Column(String)
    role = Column(String, default='user')
    status = Column(String, default='active')
    created_at = Column(DateTime, default=datetime.utcnow)

    vendor = relationship('Vendor', back_populates='user', uselist=False, cascade='all, delete-orphan')
    customer = relationship('Customer', back_populates='user', uselist=False, cascade='all, delete-orphan')

    serialize_rules = ('-vendor.user', '-customer.user',)

    @validates('email')
    def validate_email(self, key, address):
        if '@' not in address:
            raise ValueError('Invalid email')
        return address
