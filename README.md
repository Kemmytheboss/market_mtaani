# Market Mtaani API

A Flask and React application connecting vendors and customers in Eastleigh Market for easier business discovery and transactions.

## Description

Market Mtaani is a full-stack web application that enables vendors to showcase their products and customers to discover and order from local businesses in Eastleigh Market. The platform supports both wholesale and retail customers, with features for product management, order processing, and business verification.

## Setup Instructions

### Backend Setup

1. Clone the repository

2. Navigate to the project directory

3. Install dependencies:
   ```
   pipenv install
   pipenv shell
   ```

4. Navigate to the server directory:
   ```
   cd server
   ```

5. Initialize the database:
   ```
   flask db init
   flask db migrate -m "Initial migration"
   flask db upgrade
   ```

6. Seed the database:
   ```
   python seed.py
   ```

7. Run the application:
   ```
   python app.py
   ```

The server will run on `http://localhost:5555`

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The client will run on `http://localhost:3000`

## API Endpoints

### Users
* `GET /users` - Get all users (supports `?role=vendor` filtering)
* `GET /users/:id` - Get a specific user
* `POST /users` - Create a new user
* `PATCH /users/:id` - Update a user
* `DELETE /users/:id` - Delete a user

### Businesses
* `GET /businesses` - Get all businesses
* `GET /businesses/:id` - Get a specific business
* `POST /businesses` - Create a new business
* `PATCH /businesses/:id` - Update a business
* `DELETE /businesses/:id` - Delete a business

### Products
* `GET /products` - Get all products
* `GET /products/:id` - Get a specific product
* `POST /products` - Create a new product
* `PATCH /products/:id` - Update a product
* `DELETE /products/:id` - Delete a product

### Customers
* `GET /customers` - Get all customers
* `GET /customers/:id` - Get a specific customer
* `POST /customers` - Create a new customer
* `PATCH /customers/:id` - Update a customer
* `DELETE /customers/:id` - Delete a customer

### Orders
* `GET /orders` - Get all orders
* `GET /orders/:id` - Get a specific order
* `POST /orders` - Create a new order
* `PATCH /orders/:id` - Update an order
* `DELETE /orders/:id` - Delete an order

### Order Items
* `GET /order_items` - Get all order items
* `GET /order_items/:id` - Get a specific order item
* `POST /order_items` - Create a new order item
* `PATCH /order_items/:id` - Update an order item
* `DELETE /order_items/:id` - Delete an order item

## Testing

Use Postman or curl to test all endpoints. Refer to the individual route implementations for required request body formats.

## Project Structure

```
market-mtaani/
├── server/
│   ├── app.py
│   ├── models.py
│   ├── config.py
│   ├── seed.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── user_routes.py
│   │   ├── business_routes.py
│   │   ├── product_routes.py
│   │   ├── customer_routes.py
│   │   ├── order_routes.py
│   │   └── order_item_routes.py
│   ├── instance/
│   │   └── market_mtaani.db
│   └── migrations/
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── node_modules/
├── Pipfile
├── Pipfile.lock
└── README.md
```

## Technologies Used

### Backend
* Flask
* Flask-SQLAlchemy
* Flask-Migrate
* Flask-RESTful
* SQLAlchemy-Serializer

### Frontend
* React
* React Router
* Axios (or Fetch API)

## License

MIT License

## Authors
