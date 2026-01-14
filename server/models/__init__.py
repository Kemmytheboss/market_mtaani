from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

from .vendors import Vendor
from .users import User
from .products import Product
from .customers import Customer
from .orders import Order
from .order_items import OrderItem
