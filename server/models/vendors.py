from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData, Column, Integer, String, DateTime, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Vendor(db.Model, SerializerMixin):
    __tablename__ = 'vendors'

    vendor_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), unique=True, nullable=False)
    business_name = Column(String, nullable=False)
    verification_status = Column(String)  
    rating = Column(DECIMAL(3, 2))        

    # relationships
    user = relationship("User", back_populates="vendor")
    products = relationship("Product", back_populates="vendor", cascade="all, delete-orphan")

    serialize_rules = ('-user.vendor', '-products.vendor')