from sqlalchemy import Column, Integer, String, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship, validates
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

    @validates('rating')
    def validate_rating(self, key, rating):
        if rating is None:
            return rating
        try:
            r = float(rating)
        except Exception:
            raise ValueError('rating must be numeric')
        if r < 0 or r > 5:
            raise ValueError('rating must be between 0 and 5')
        return rating
