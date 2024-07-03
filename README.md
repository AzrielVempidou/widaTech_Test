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
    date: DataTypes.DATE,
    customerName: DataTypes.STRING,
    employeeId:DataTypes.INTEGER,
    notes: DataTypes.STRING,
    totalAmountPaid: DataTypes.INTEGER
}
```
```js
const InvoiceCard = {
  invoiceId: DataTypes.INTEGER,
  productId: DataTypes.INTEGER,
  quantity: DataTypes.INTEGER,
  price: DataTypes.INTEGER
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
  "role": "admin"  // or "admin"
}
```
- Response:
```json
{
  "success": true,
  "message": "User with email john@example.com created succesfully"
}
```
### User Login
- Endpoint: /api/login
- Method: POST
- Request Body:
```json
{
  "email": "john@example.com",
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
- Query Parameters:
  - page=[integer] (default: 1) - Specifies the page number for pagination.
  - limit=[integer] (default: 10) - Specifies the number of invoices per page.
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
### Delete Invoices 
- Endpoint: /api/invoices/:id
- Method: DELETE

- Response:
```json
Code: 200 OK
Content: { "message": "Invoice deleted successfully" }
```
### Product Autocomplete
Search Products
- Endpoint: /api/products/search
- Method: GET
- Query Parameters: q (search query)
- Response:
```json
{
  "invoices": [
    {
      "id": "1",
      "invoiceNumber": "INV-001",
      "amount": 100.00,
      "createdAt": "2024-07-03T10:15:30Z",
      "updatedAt": "2024-07-03T10:15:30Z"
      // Additional fields as per your schema
    },
    // Additional invoices...
  ],
  "totalPages": 5,
  "currentPage": 1
}

```
### Revenue Data
Fetch Revenue Data
- Endpoint: /api/revenue
- Method: GET
- Query Parameters: interval (daily, weekly, monthly)
- Response:
```json
{
    "success": true,
    "revenue": 300
}
```

