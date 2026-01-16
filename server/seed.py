#!/usr/bin/env python3
# server/seed.py

from app import app
from models import db, User, Business, Customer, Product, Order, OrderItem, bcrypt
from datetime import datetime

def seed_data():
    with app.app_context():
        print("Clearing existing data...")
        OrderItem.query.delete()
        Order.query.delete()
        Product.query.delete()
        Business.query.delete()
        Customer.query.delete()
        User.query.delete()
        
        print("Seeding users...")
        
        # Create Users
        users = [
            User(
                full_name="Fatuma Mohamed",
                email="fatuma@marketmtaani.com",
                phone="0712345678",
                role="vendor",
                status="active"
            ),
            User(
                full_name="Ahmed Hassan",
                email="ahmed@marketmtaani.com",
                phone="0723456789",
                role="vendor",
                status="active"
            ),
            User(
                full_name="Halima Ibrahim",
                email="halima@marketmtaani.com",
                phone="0734567890",
                role="vendor",
                status="active"
            ),
            User(
                full_name="Amina Ali",
                email="amina@marketmtaani.com",
                phone="0745678901",
                role="vendor",
                status="active"
            ),
            User(
                full_name="Hassan Abdi",
                email="hassan@marketmtaani.com",
                phone="0756789012",
                role="vendor",
                status="active"
            ),
            User(
                full_name="Grace Wanjiru",
                email="grace@marketmtaani.com",
                phone="0767890123",
                role="customer",
                status="active"
            ),
            User(
                full_name="John Kamau",
                email="john@marketmtaani.com",
                phone="0778901234",
                role="customer",
                status="active"
            ),
        ]

        for user in users:
            user.set_password("password123")
        
        db.session.add_all(users)
        db.session.commit()
        
        print("Users seeded successfully!")
        
        print("Seeding businesses...")
        
        # Create Businesses
        businesses = [
            Business(
                user_id=users[0].user_id,
                business_name="Fatuma's Fashion House",
                verification_status="verified",
                rating=4.8
            ),
            Business(
                user_id=users[1].user_id,
                business_name="Ahmed's Shoe Palace",
                verification_status="verified",
                rating=4.7
            ),
            Business(
                user_id=users[2].user_id,
                business_name="Halima's Perfume Paradise",
                verification_status="verified",
                rating=4.9
            ),
            Business(
                user_id=users[3].user_id,
                business_name="Amina's Jewelry & Accessories",
                verification_status="verified",
                rating=4.6
            ),
            Business(
                user_id=users[4].user_id,
                business_name="Hassan's Style Hub",
                verification_status="pending",
                rating=4.5
            ),
        ]
        
        db.session.add_all(businesses)
        db.session.commit()
        
        print("✅ Businesses seeded successfully!")
        
        print("Seeding products...")
        
        # Create Products
        products = [
            # Fatuma's Fashion House - Clothing
            Product(
                business_id=businesses[0].vendor_id,
                name="Elegant Evening Dress",
                description="Beautiful evening dress perfect for special occasions. Image: https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400",
                price=3500,
                bulk_price=3000,
                min_bulk_quantity=5,
                stock_quantity=25,
                category_id=1
            ),
            Product(
                business_id=businesses[0].vendor_id,
                name="Ladies Casual Blouse",
                description="Comfortable and stylish casual blouse. Image: https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400",
                price=1200,
                bulk_price=1000,
                min_bulk_quantity=10,
                stock_quantity=50,
                category_id=1
            ),
            Product(
                business_id=businesses[0].vendor_id,
                name="Men's Formal Suit",
                description="Premium quality formal suit for men. Image: https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400",
                price=8500,
                stock_quantity=15,
                category_id=1
            ),
            Product(
                business_id=businesses[0].vendor_id,
                name="Women's Maxi Dress",
                description="Flowing maxi dress in vibrant colors. Image: https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400",
                price=2800,
                bulk_price=2500,
                min_bulk_quantity=8,
                stock_quantity=30,
                category_id=1
            ),
            Product(
                business_id=businesses[0].vendor_id,
                name="Men's Casual Shirt",
                description="Cotton casual shirt for everyday wear. Image: https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
                price=1500,
                bulk_price=1300,
                min_bulk_quantity=10,
                stock_quantity=40,
                category_id=1
            ),
            
            # Ahmed's Shoe Palace - Footwear
            Product(
                business_id=businesses[1].vendor_id,
                name="Ladies High Heels",
                description="Elegant high heels for special occasions. Image: https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
                price=3200,
                bulk_price=2800,
                min_bulk_quantity=6,
                stock_quantity=20,
                category_id=2
            ),
            Product(
                business_id=businesses[1].vendor_id,
                name="Men's Leather Shoes",
                description="Premium leather formal shoes. Image: https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=400",
                price=4500,
                stock_quantity=18,
                category_id=2
            ),
            Product(
                business_id=businesses[1].vendor_id,
                name="Ladies Sandals",
                description="Comfortable summer sandals. Image: https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400",
                price=1800,
                bulk_price=1500,
                min_bulk_quantity=10,
                stock_quantity=45,
                category_id=2
            ),
            Product(
                business_id=businesses[1].vendor_id,
                name="Men's Sneakers",
                description="Sporty and comfortable sneakers. Image: https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
                price=3800,
                stock_quantity=25,
                category_id=2
            ),
            Product(
                business_id=businesses[1].vendor_id,
                name="Ladies Boots",
                description="Stylish ankle boots. Image: https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=400",
                price=4200,
                stock_quantity=12,
                category_id=2
            ),
            
            # Halima's Perfume Paradise - Perfumes
            Product(
                business_id=businesses[2].vendor_id,
                name="Luxury French Perfume",
                description="Exquisite long-lasting fragrance. Image: https://images.unsplash.com/photo-1541643600914-78b084683601?w=400",
                price=5500,
                stock_quantity=30,
                category_id=3
            ),
            Product(
                business_id=businesses[2].vendor_id,
                name="Arabian Oud Perfume",
                description="Traditional Arabian oud fragrance. Image: https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400",
                price=6200,
                stock_quantity=20,
                category_id=3
            ),
            Product(
                business_id=businesses[2].vendor_id,
                name="Floral Body Spray",
                description="Fresh floral scent body spray. Image: https://images.unsplash.com/photo-1588405748880-12d1d2a59926?w=400",
                price=1200,
                bulk_price=1000,
                min_bulk_quantity=12,
                stock_quantity=60,
                category_id=3
            ),
            Product(
                business_id=businesses[2].vendor_id,
                name="Men's Cologne",
                description="Masculine and sophisticated cologne. Image: https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400",
                price=3800,
                stock_quantity=25,
                category_id=3
            ),
            Product(
                business_id=businesses[2].vendor_id,
                name="Unisex Perfume Set",
                description="Set of 3 unisex perfumes. Image: https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400",
                price=4500,
                stock_quantity=15,
                category_id=3
            ),
            
            # Amina's Jewelry & Accessories
            Product(
                business_id=businesses[3].vendor_id,
                name="Gold Plated Necklace",
                description="Beautiful gold plated necklace. Image: https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
                price=2800,
                stock_quantity=35,
                category_id=4
            ),
            Product(
                business_id=businesses[3].vendor_id,
                name="Ladies Handbag",
                description="Genuine leather handbag. Image: https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
                price=3500,
                bulk_price=3000,
                min_bulk_quantity=5,
                stock_quantity=22,
                category_id=4
            ),
            Product(
                business_id=businesses[3].vendor_id,
                name="Fashion Sunglasses",
                description="Trendy UV protection sunglasses. Image: https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
                price=1500,
                bulk_price=1200,
                min_bulk_quantity=10,
                stock_quantity=50,
                category_id=4
            ),
            Product(
                business_id=businesses[3].vendor_id,
                name="Silver Earrings",
                description="Elegant silver earrings. Image: https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",
                price=1800,
                stock_quantity=40,
                category_id=4
            ),
            Product(
                business_id=businesses[3].vendor_id,
                name="Designer Watch",
                description="Luxury designer watch. Image: https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400",
                price=8500,
                stock_quantity=10,
                category_id=4
            ),
            Product(
                business_id=businesses[3].vendor_id,
                name="Leather Belt",
                description="Premium leather belt. Image: https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=400",
                price=1200,
                bulk_price=1000,
                min_bulk_quantity=15,
                stock_quantity=45,
                category_id=4
            ),
            
            # Hassan's Style Hub - Mixed Fashion
            Product(
                business_id=businesses[4].vendor_id,
                name="Denim Jacket",
                description="Trendy denim jacket for all seasons. Image: https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
                price=3200,
                stock_quantity=20,
                category_id=1
            ),
            Product(
                business_id=businesses[4].vendor_id,
                name="Sports Cap",
                description="Comfortable sports cap. Image: https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400",
                price=800,
                bulk_price=650,
                min_bulk_quantity=20,
                stock_quantity=100,
                category_id=4
            ),
            Product(
                business_id=businesses[4].vendor_id,
                name="Wallet",
                description="Genuine leather wallet. Image: https://images.unsplash.com/photo-1627123424574-724758594e93?w=400",
                price=1500,
                stock_quantity=35,
                category_id=4
            ),
            Product(
                business_id=businesses[4].vendor_id,
                name="Fashion Scarf",
                description="Silk fashion scarf. Image: https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400",
                price=1200,
                bulk_price=1000,
                min_bulk_quantity=12,
                stock_quantity=40,
                category_id=4
            ),
        ]
        
        db.session.add_all(products)
        db.session.commit()
        
        print("Products seeded successfully!")
        
        print("Seeding customers...")
        
        # Create Customers
        customers = [
            Customer(
                user_id=users[5].user_id,
                customer_type="RETAILER"
            ),
            Customer(
                user_id=users[6].user_id,
                customer_type="WHOLESALER",
                business_name="Kamau Fashion Wholesale"
            ),
        ]
        
        db.session.add_all(customers)
        db.session.commit()
        
        print("Customers seeded successfully!")
        
        print("Seeding orders...")
        
        # Create Orders
        orders = [
            Order(
                customer_id=customers[0].customer_id,
                order_type="retail",
                total_amount=7200,
                order_status="completed",
                payment_status="paid",
                payment_method="mpesa",
                transaction_reference="QX123ABC",
                delivery_address="Eastleigh 10th Street, House 45",
                delivery_status="delivered"
            ),
            Order(
                customer_id=customers[1].customer_id,
                order_type="wholesale",
                total_amount=45000,
                order_status="processing",
                payment_status="paid",
                payment_method="bank_transfer",
                transaction_reference="BT456DEF",
                delivery_address="Eastleigh Business Center, Shop 23",
                delivery_status="in_transit"
            ),
        ]
        
        db.session.add_all(orders)
        db.session.commit()
        
        print("Orders seeded successfully!")
        
        print("Seeding order items...")
        
        # Create Order Items
        order_items = [
            OrderItem(
                order_id=orders[0].order_id,
                product_id=products[0].product_id,  # Evening Dress
                quantity=2,
                unit_price=3500
            ),
            OrderItem(
                order_id=orders[1].order_id,
                product_id=products[1].product_id,  # Casual Blouse
                quantity=30,
                unit_price=1000  # Bulk price
            ),
            OrderItem(
                order_id=orders[1].order_id,
                product_id=products[7].product_id,  # Sandals
                quantity=10,
                unit_price=1500  # Bulk price
            ),
        ]
        
        db.session.add_all(order_items)
        db.session.commit()
        
        print("Order items seeded successfully!")
        
        print("=" * 50)
        print("Database seeding completed successfully!")
        print("=" * 50)
        print(f"Total Users: {len(users)}")
        print(f"Total Businesses: {len(businesses)}")
        print(f"Total Products: {len(products)}")
        print(f"Total Customers: {len(customers)}")
        print(f"Total Orders: {len(orders)}")
        print(f"Total Order Items: {len(order_items)}")
        print("=" * 50)

if __name__ == '__main__':
    seed_data()