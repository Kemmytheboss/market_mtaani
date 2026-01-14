import random
from decimal import Decimal
from server.app import app
from server.models import db, User, Vendor, Product, Customer, Order, OrderItem


def simple_name(i):
    return f'User {i}'


def simple_company(i):
    return f'Business {i}'


def simple_address(i):
    return f'{i} Example Street, City'


def create_sample_data():
    with app.app_context():
        db.drop_all()
        db.create_all()

        users = []
        for i in range(10):
            u = User(
                full_name=simple_name(i),
                email=f'user{i}@example.com',
                phone=f'+10000000{i:02d}',
                role='user'
            )
            u.set_password('password')
            db.session.add(u)
            users.append(u)

        db.session.commit()

        vendors = []
        for i in range(5):
            v = Vendor(user_id=users[i].user_id, business_name=simple_company(i), verification_status='verified', rating=Decimal('4.5'))
            db.session.add(v)
            vendors.append(v)

        customers = []
        for i in range(5, 10):
            c = Customer(user_id=users[i].user_id, address=simple_address(i))
            db.session.add(c)
            customers.append(c)

        db.session.commit()

        products = []
        for i in range(20):
            v = random.choice(vendors)
            price = Decimal(str(round(random.uniform(1.0, 100.0), 2)))
            p = Product(
                name=f'Product {i}',
                description=f'Description for product {i}',
                price=price,
                stock=random.randint(1, 100),
                vendor_id=v.vendor_id
            )
            db.session.add(p)
            products.append(p)

        db.session.commit()

        orders = []
        for i in range(10):
            cust = random.choice(customers)
            items = []
            num_items = random.randint(1, 4)
            total = Decimal('0.00')
            for _ in range(num_items):
                prod = random.choice(products)
                qty = random.randint(1, 5)
                price = prod.price
                total += Decimal(price) * qty
                oi = OrderItem(quantity=qty, price=price, product_id=prod.product_id)
                items.append(oi)

            order = Order(
                customer_id=cust.customer_id,
                order_type='online',
                total_amount=total,
                order_status='new',
                payment_status='pending',
                payment_method='card',
                delivery_address=cust.address,
                delivery_status='pending'
            )
            db.session.add(order)
            db.session.flush()

            for oi in items:
                oi.order_id = order.order_id
                db.session.add(oi)

            orders.append(order)

        db.session.commit()

        print('Seed complete:')
        print(f'  Users: {len(users)}')
        print(f'  Vendors: {len(vendors)}')
        print(f'  Customers: {len(customers)}')
        print(f'  Products: {len(products)}')
        print(f'  Orders: {len(orders)}')


if __name__ == '__main__':
    create_sample_data()
