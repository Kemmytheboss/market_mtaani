from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

from . import db
from werkzeug.security import generate_password_hash, check_password_hash


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

    @validates('full_name')
    def validate_full_name(self, key, name):
        if not name or not name.strip():
            raise ValueError('full_name is required')
        return name.strip()

    def set_password(self, password: str):
        if not password:
            raise ValueError('password is required')
        self.password = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        if not self.password:
            return False
        return check_password_hash(self.password, password)
