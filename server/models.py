# server/models.py

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime

metadata = MetaData(
    naming_convention={
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s"
    }
)

db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"
   
    serialize_rules = ("-business.user", "-customer.user")
    
    user_id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    phone = db.Column(db.String)
    role = db.Column(db.String)
    status = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # relationships
    business = db.relationship("Business", back_populates="user", uselist=False)
    customer = db.relationship("Customer", back_populates="user", uselist=False)
    
    # validations
    @validates("email")
    def validate_email(self, key, value):
        if not value:
            raise ValueError("Email is required")
        if "@" not in value:
            raise ValueError("Invalid email address")
        return value
    
    @validates("full_name")
    def validate_full_name(self, key, value):
        if not value or len(value.strip()) == 0:
            raise ValueError("Full name is required")
        return value
    
    @validates("password")
    def validate_password(self, key, value):
        if not value or len(value) < 6:
            raise ValueError("Password must be at least 6 characters long")
        return value
    
    def __repr__(self):
        return f"<User id={self.user_id} email={self.email}>"


class Business(db.Model, SerializerMixin):
    __tablename__ = "businesses"
    
    serialize_rules = ("-user.business", "-products.business")
    
    vendor_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), unique=True, nullable=False)
    business_name = db.Column(db.String, nullable=False)
    verification_status = db.Column(db.String, default="pending")
    rating = db.Column(db.Numeric(3, 2))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # relationships
    user = db.relationship("User", back_populates="business")
    products = db.relationship("Product", back_populates="business", cascade="all, delete-orphan")
    
    # validations
    @validates("business_name")
    def validate_business_name(self, key, value):
        if not value or len(value.strip()) == 0:
            raise ValueError("Business name is required")
        return value
    
    @validates("rating")
    def validate_rating(self, key, value):
        if value is not None and (value < 0 or value > 5):
            raise ValueError("Rating must be between 0 and 5")
        return value
    
    @validates("verification_status")
    def validate_verification_status(self, key, value):
        allowed_statuses = ["pending", "verified", "rejected"]
        if value and value not in allowed_statuses:
            raise ValueError(f"Verification status must be one of: {', '.join(allowed_statuses)}")
        return value
    
    def __repr__(self):
        return f"<Business id={self.vendor_id} name={self.business_name}>"


class Product(db.Model, SerializerMixin):
    __tablename__ = "products"
  
    serialize_rules = ("-business.products", "-order_items.product")
    
    product_id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.vendor_id"), nullable=False)
    category_id = db.Column(db.Integer)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    bulk_price = db.Column(db.Numeric(10, 2))
    min_bulk_quantity = db.Column(db.Integer)
    stock_quantity = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # relationships
    business = db.relationship("Business", back_populates="products")
    order_items = db.relationship("OrderItem", back_populates="product", cascade="all, delete-orphan")
    
    # validations
    @validates("name")
    def validate_name(self, key, value):
        if not value or len(value.strip()) == 0:
            raise ValueError("Product name is required")
        return value
    
    @validates("price")
    def validate_price(self, key, value):
        if value is None:
            raise ValueError("Price is required")
        if value < 0:
            raise ValueError("Price must be non-negative")
        return value
    
    @validates("bulk_price")
    def validate_bulk_price(self, key, value):
        if value is not None and value < 0:
            raise ValueError("Bulk price must be non-negative")
        return value
    
    @validates("stock_quantity")
    def validate_stock_quantity(self, key, value):
        if value is not None and value < 0:
            raise ValueError("Stock quantity must be non-negative")
        return value
    
    @validates("min_bulk_quantity")
    def validate_min_bulk_quantity(self, key, value):
        if value is not None and value < 0:
            raise ValueError("Minimum bulk quantity must be non-negative")
        return value
    
    def __repr__(self):
        return f"<Product id={self.product_id} name={self.name}>"


class Customer(db.Model, SerializerMixin):
    __tablename__ = "customers"

    serialize_rules = ("-user.customer", "-orders.customer")

    customer_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.user_id"), unique=True, nullable=False)
    customer_type = db.Column(db.String, nullable=False)
    business_name = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # relationships
    user = db.relationship("User", back_populates="customer")
    orders = db.relationship("Order", back_populates="customer", cascade="all, delete-orphan")
    
    # validations
    @validates("customer_type")
    def validate_customer_type(self, key, value):
        allowed_types = ["WHOLESALER", "RETAILER"]
        if not value:
            raise ValueError("Customer type is required")
        if value not in allowed_types:
            raise ValueError(f"Customer type must be one of: {', '.join(allowed_types)}")
        return value
    
    def __repr__(self):
        return f"<Customer id={self.customer_id} type={self.customer_type}>"


class Order(db.Model, SerializerMixin):
    __tablename__ = "orders"
    
    serialize_rules = ("-customer.orders", "-order_items.order")

    order_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.customer_id"), nullable=False)
    order_type = db.Column(db.String)
    total_amount = db.Column(db.Numeric(10, 2), nullable=False)
    order_status = db.Column(db.String, default="pending")
    payment_status = db.Column(db.String, default="unpaid")
    payment_method = db.Column(db.String)
    transaction_reference = db.Column(db.String)
    delivery_address = db.Column(db.String)
    delivery_status = db.Column(db.String, default="not_shipped")
    order_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    # relationships
    customer = db.relationship("Customer", back_populates="orders")
    order_items = db.relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")
    
    # validations
    @validates("total_amount")
    def validate_total_amount(self, key, value):
        if value is None:
            raise ValueError("Total amount is required")
        if value < 0:
            raise ValueError("Total amount must be non-negative")
        return value
    
    @validates("order_status")
    def validate_order_status(self, key, value):
        allowed_statuses = ["pending", "confirmed", "processing", "completed", "cancelled"]
        if value and value not in allowed_statuses:
            raise ValueError(f"Order status must be one of: {', '.join(allowed_statuses)}")
        return value
    
    @validates("payment_status")
    def validate_payment_status(self, key, value):
        allowed_statuses = ["unpaid", "paid", "refunded"]
        if value and value not in allowed_statuses:
            raise ValueError(f"Payment status must be one of: {', '.join(allowed_statuses)}")
        return value
    
    @validates("delivery_status")
    def validate_delivery_status(self, key, value):
        allowed_statuses = ["not_shipped", "shipped", "in_transit", "delivered"]
        if value and value not in allowed_statuses:
            raise ValueError(f"Delivery status must be one of: {', '.join(allowed_statuses)}")
        return value
    
    def __repr__(self):
        return f"<Order id={self.order_id} total={self.total_amount}>"


class OrderItem(db.Model, SerializerMixin):
    __tablename__ = "order_items"
   
    serialize_rules = ("-order.order_items", "-product.order_items")

    order_item_id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey("orders.order_id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey("products.product_id"), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Numeric(10, 2), nullable=False)
    
    # relationships
    order = db.relationship("Order", back_populates="order_items")
    product = db.relationship("Product", back_populates="order_items")
    
    # validations
    @validates("quantity")
    def validate_quantity(self, key, value):
        if value is None:
            raise ValueError("Quantity is required")
        if value <= 0:
            raise ValueError("Quantity must be greater than zero")
        return value
    
    @validates("unit_price")
    def validate_unit_price(self, key, value):
        if value is None:
            raise ValueError("Unit price is required")
        if value <= 0:
            raise ValueError("Unit price must be greater than zero")
        return value
    
    def __repr__(self):
        return f"<OrderItem id={self.order_item_id} qty={self.quantity}>"