from sqlalchemy import Column, Integer, String, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship
from sqlalchemy_serializer import SerializerMixin

from . import db


class Vendor(db.Model, SerializerMixin):
    __tablename__ = 'vendors'

    vendor_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), unique=True, nullable=False)
    business_name = Column(String, nullable=False)
    verification_status = Column(String, default='unverified')
    rating = Column(DECIMAL(3, 2))

    user = relationship('User', back_populates='vendor')
    products = relationship('Product', back_populates='vendor', cascade='all, delete-orphan')

    serialize_rules = ('-user.vendor', '-products.vendor')
