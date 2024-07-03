# API Design and Models
## Models
### User Model
```javascript
const User = {
  id: String,
  username: String,
  email: String,
  passwordHash: String // Store hashed passwords
}
```
### Product Model
```javascript
const Product = {
  id: String,
  name: String,
  picture: String,
  stock: Number,
  price: Number
}
```
### Invoice Model
```javascript
const Invoice = {
  id: String,
  date: Date,
  customerName: String,
  salespersonName: String,
  notes: String,
  products: [
    {
      productId: String,
      quantity: Number,
      price: Number
    }
  ],
  totalAmountPaid: Number
}
```
### Revenue Model
```javascript
const Revenue = {
  date: Date,
  revenue: Number
}
```
## API Endpoints
### Authentication
- User Registration and Login
### User Registration 
- Endpoint: /api/register
- Method: POST
- Request Body:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "staff"  // or "admin"
}
```
- Response:
```json
{
  "success": true,
  "message": "User registered successfully"
}
```
### User Login
- Endpoint: /api/login
- Method: POST
- Request Body:
```json
{
  "username": "john_doe",
  "password": "securepassword"
}
```
- Response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token"
}
```
### Invoice Management
### Add Invoice
- Endpoint: /api/invoices
- Method: POST
- Request Body:
```json
{
  "date": "2024-07-01",
  "customerName": "John Doe",
  "salespersonName": "Jane Smith",
  "notes": "Quick delivery requested",
  "products": [
    {
      "productId": "1",
      "quantity": 2,
      "price": 100
    },
    {
      "productId": "2",
      "quantity": 1,
      "price": 50
    }
  ]
}
```
- Response:
```json
{
  "success": true,
  "message": "Invoice added successfully"
}
```
### Get Invoices with Pagination
- Endpoint: /api/invoices
- Method: GET
- Query Parameters: page, limit
- Response:
```json
{
  "invoices": [
    {
      "id": "1",
      "customerName": "John Doe",
      "salespersonName": "Jane Smith",
      "totalAmountPaid": 200,
      "notes": "Quick delivery requested"
    },
    {
      "id": "2",
      "customerName": "Alice Johnson",
      "salespersonName": "Michael Brown",
      "totalAmountPaid": 150,
      "notes": ""
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 10
  }
}
```
### Product Autocomplete
Search Products
- Endpoint: /api/products/search
- Method: GET
- Query Parameters: q (search query)
- Response:
```json
[
  {
    "id": "1",
    "name": "Product 1",
    "picture": "url_to_picture",
    "stock": 100,
    "price": 50
  },
  {
    "id": "2",
    "name": "Product 2",
    "picture": "url_to_picture",
    "stock": 200,
    "price": 75
  }
]
```
### Revenue Data
Fetch Revenue Data
- Endpoint: /api/revenue
- Method: GET
- Query Parameters: interval (daily, weekly, monthly)
- Response:
```json
{
  "data": [
    {
      "date": "2024-07-01",
      "revenue": 500
    },
    {
      "date": "2024-07-02",
      "revenue": 700
    }
  ]
}
```

