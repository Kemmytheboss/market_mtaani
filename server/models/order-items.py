from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from datetime import datetime
from app import db  # assuming you import db from your app module

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = Column(Integer, primary_key=True)
    
    # Foreign keys
    order_id = Column(Integer, ForeignKey('orders.order_id'), nullable=False)
    product_id = Column(Integer, ForeignKey('products.product_id'), nullable=False)

    quantity = Column(Integer, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)

    # Relationships
    order = relationship("Order", back_populates="order_items")
    product = relationship("Product", back_populates="order_items")
