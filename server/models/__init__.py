from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

# Import models so they are registered with SQLAlchemy
from .users import User  # noqa: F401
from .vendors import Vendor  # noqa: F401
from .products import Product  # noqa: F401
from .customers import Customer  # noqa: F401
from .orders import Order  # noqa: F401
from .order_items import OrderItem  # noqa: F401
