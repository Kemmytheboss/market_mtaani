from app import db

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    id = db.Column(db.Integer, primary_key=True)

    order_id = db.Column(
        db.Integer,
        db.ForeignKey('orders.id'),
        nullable=False
    )

    product_id = db.Column(
        db.Integer,
        db.ForeignKey('products.id'),
        nullable=False
    )

    vendor_id = db.Column(
        db.Integer,
        db.ForeignKey('vendors.id'),
        nullable=False
    )

    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Numeric(10, 2), nullable=False)

    # Relationships
    order = db.relationship('Order', backref='order_items')
    product = db.relationship('Product', backref='order_items')
    vendor = db.relationship('Vendor', backref='order_items')
