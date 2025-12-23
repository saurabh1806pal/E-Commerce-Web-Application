# Project Detail Documentation

## 🏗️ Architecture Overview

This E-Commerce Web Application follows a **three-tier architecture** with separate client and server components:

- **Client**: React.js frontend for user interactions
- **Server**: Node.js/Express API server for user operations
- **Server-Admin**: Dedicated Node.js/Express server for administrative functions

## 📂 Complete Project Structure

```
E-Commerce-Web-Application/
├── client/                          # React Frontend Application
│   ├── public/
│   │   └── vite.svg                # Vite logo
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg           # React logo
│   │   ├── components/
│   │   │   ├── Footer.jsx          # Footer component
│   │   │   ├── Header.jsx          # Navigation header
│   │   │   └── ProtectedRoute.jsx  # Route protection wrapper
│   │   ├── context/
│   │   │   ├── AuthContext.jsx     # Authentication state management
│   │   │   ├── CartContext.jsx     # Shopping cart state
│   │   │   ├── ProductContext.jsx  # Product data management
│   │   │   └── WishListContext.jsx # Wishlist state management
│   │   ├── pages/
│   │   │   ├── CardCart.jsx        # Cart item component
│   │   │   ├── CardProduct.jsx     # Product card component
│   │   │   ├── CardSummary.jsx     # Order summary component
│   │   │   ├── CardWishlist.jsx    # Wishlist item component
│   │   │   ├── Forbidden.jsx       # 403 error page
│   │   │   ├── Login.jsx           # User login page
│   │   │   ├── NotFound.jsx        # 404 error page
│   │   │   ├── PageEarbuds.jsx     # Earbuds category page
│   │   │   ├── PageHeadphones.jsx  # Headphones category page
│   │   │   ├── PagePosters.jsx     # Posters category page
│   │   │   ├── PageSpeaker.jsx     # Speakers category page
│   │   │   ├── PageWallet.jsx      # Wallets category page
│   │   │   ├── PageWatch.jsx       # Watches category page
│   │   │   ├── SignUp.jsx          # User registration page
│   │   │   ├── UserCart.jsx        # Shopping cart page
│   │   │   ├── UserHome.jsx        # Main homepage
│   │   │   ├── UserProductDetailPage.jsx # Product details page
│   │   │   ├── UserProfile.jsx     # User profile page
│   │   │   └── UserWishlist.jsx    # Wishlist page
│   │   ├── App.css                 # Global styles
│   │   ├── App.jsx                 # Main app component
│   │   ├── index.css               # Base styles
│   │   └── main.jsx                # App entry point with routing
│   ├── package.json                # Frontend dependencies
│   └── vite.config.js              # Vite configuration
│
├── server/                          # User Operations API Server
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # Database connection
│   │   ├── controllers/
│   │   │   ├── auth.controller.js  # User authentication logic
│   │   │   └── user.controller.js  # User operations (cart, wishlist, profile)
│   │   ├── middlewares/
│   │   │   └── redirectIfLoggedIn.js # Authentication middleware
│   │   ├── models/
│   │   │   ├── product.model.js    # Product schema
│   │   │   └── user.model.js       # User schema with cart & wishlist
│   │   ├── routes/
│   │   │   ├── auth.routes.js      # Authentication endpoints
│   │   │   └── user.routes.js      # User operation endpoints
│   │   └── views/                  # EJS templates (legacy)
│   ├── .env                        # Environment variables
│   ├── index.js                    # Server entry point
│   └── package.json                # Server dependencies
│
└── server-admin/                    # Administrative Operations Server
    ├── src/
    │   ├── config/
    │   │   └── db.js               # Database connection
    │   ├── controllers/
    │   │   ├── admin.controller.js # Product CRUD operations
    │   │   └── auth.controller.js  # Admin authentication
    │   ├── middlewares/
    │   │   └── redirectIfLoggedIn.js # Admin authentication middleware
    │   ├── models/
    │   │   ├── product.model.js    # Product schema
    │   │   └── user.model.js       # User schema
    │   ├── public/
    │   │   └── css/                # Admin panel styles
    │   ├── routes/
    │   │   ├── admin.routes.js     # Admin operation endpoints
    │   │   └── auth.routes.js      # Admin authentication routes
    │   └── views/
    │       ├── admin/              # Admin panel EJS templates
    │       └── auth/               # Admin login templates
    ├── .env                        # Environment variables
    ├── index.js                    # Admin server entry point
    └── package.json                # Admin server dependencies
```

## 🔧 Technology Stack

### Frontend (Client)
- **React 19.2.0** - UI library with hooks and context
- **Vite** - Build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **Lucide React** - Icon library
- **React Icons** - Additional icon components

### Backend (Server & Server-Admin)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **EJS** - Server-side templating (admin panel)
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **connect-mongodb-session** - MongoDB session store
- **jsonwebtoken** - JWT authentication
- **express-validator** - Input validation
- **multer** - File upload handling

## 🚀 Core Functionality

### 1. User Management System

#### Authentication & Authorization
- **User Registration**: New user signup with email validation
- **User Login**: Secure authentication with session management
- **Admin Login**: Separate admin authentication system
- **Session Management**: MongoDB-based session storage
- **Route Protection**: Protected routes for authenticated users only

#### User Roles
- **Regular Users**: Browse, cart, wishlist, profile management
- **Administrators**: Full product management capabilities

### 2. Product Management System

#### Product Schema
```javascript
{
  productName: String (required),
  brandName: String (required),
  images: String (required),
  originalPrice: Number (required, min: 0),
  currentPrice: Number (required, validation: <= originalPrice),
  category: Enum [
    "Headphones", "EarBuds", "Watch", 
    "Speaker", "Desk-Organisers", "Poster", "Wallet"
  ],
  description: String (required),
  timestamps: true
}
```

#### Admin Operations (Server-Admin)
- **Add Products**: Create new products with validation
- **Edit Products**: Update existing product information
- **Delete Products**: Remove products from catalog
- **View All Products**: Admin dashboard with product listing
- **Image Management**: Handle product image uploads

#### User Operations (Server)
- **Browse Products**: View all available products
- **Category Filtering**: Filter by product categories
- **Product Details**: Detailed product information pages
- **Search Functionality**: Find products by name/brand

### 3. Shopping Cart System

#### Cart Operations
- **Add to Cart**: Add products to user's shopping cart
- **Remove from Cart**: Remove specific items
- **View Cart**: Display all cart items with quantities
- **Cart Persistence**: Cart data stored in user profile
- **Cart Summary**: Calculate totals and display summary

#### Cart Features
- **User-specific Carts**: Each user has individual cart
- **Product References**: Cart items reference product IDs
- **Real-time Updates**: Immediate cart state updates

### 4. Wishlist System

#### Wishlist Operations
- **Add to Wishlist**: Save products for later
- **Remove from Wishlist**: Remove saved items
- **View Wishlist**: Display all saved products
- **Wishlist to Cart**: Move items from wishlist to cart

#### Wishlist Features
- **User-specific Lists**: Individual wishlist per user
- **Product Population**: Full product details in wishlist
- **Persistent Storage**: Wishlist data saved in database

### 5. User Profile Management

#### Profile Features
- **View Profile**: Display user information
- **Profile Data**: Name, email, user type
- **Session Integration**: Profile data from session
- **Account Management**: Basic account information display

### 6. Category-Based Navigation

#### Product Categories
- **Headphones**: Premium audio equipment
- **Earbuds**: Portable audio devices
- **Watches**: Timepieces and smartwatches
- **Speakers**: Audio speakers and sound systems
- **Posters**: Decorative wall art
- **Wallets**: Leather goods and accessories
- **Desk Organisers**: Office and workspace accessories

#### Category Features
- **Dedicated Pages**: Separate page for each category
- **Category Filtering**: Filter products by category
- **Category Navigation**: Easy category switching

## 🔐 Security Features

### Authentication Security
- **Password Hashing**: bcryptjs for secure password storage
- **Session Management**: Secure session handling
- **JWT Tokens**: Token-based authentication
- **Input Validation**: express-validator for data validation
- **Route Protection**: Middleware-based access control

### Data Security
- **MongoDB Security**: Secure database connections
- **Environment Variables**: Sensitive data in .env files
- **Session Encryption**: Encrypted session data
- **CORS Configuration**: Cross-origin request handling

## 🌐 API Architecture

### Server (User Operations) - Port 4000
```
Authentication Endpoints:
POST /signup          - User registration
POST /login           - User authentication
POST /logout          - User logout

User Endpoints:
GET /api/products     - Get all products
GET /api/product/:id  - Get product details
GET /api/profile      - Get user profile

Cart Endpoints:
GET /api/cart         - Get user cart
POST /api/cart/:id    - Add to cart
DELETE /api/cart/:id  - Remove from cart

Wishlist Endpoints:
GET /api/wishlist     - Get user wishlist
POST /api/wishlist/:id - Add to wishlist
DELETE /api/wishlist/:id - Remove from wishlist
```

### Server-Admin (Admin Operations) - Separate Port
```
Admin Authentication:
POST /admin/login     - Admin login
POST /admin/logout    - Admin logout

Product Management:
GET /admin/products   - View all products
GET /admin/add-product - Add product form
POST /admin/add-product - Create new product
GET /admin/edit/:id   - Edit product form
POST /admin/edit/:id  - Update product
DELETE /admin/delete/:id - Delete product
```

## 🎨 Frontend Architecture

### Context Providers
- **AuthContext**: User authentication state
- **ProductContext**: Product data management
- **CartContext**: Shopping cart state
- **WishlistContext**: Wishlist state management

### Component Structure
- **Layout Components**: Header, Footer, App wrapper
- **Page Components**: Individual page implementations
- **Card Components**: Reusable product/cart/wishlist cards
- **Protected Routes**: Authentication-based route access

### State Management
- **React Context**: Global state management
- **Redux Toolkit**: Advanced state management
- **Local State**: Component-specific state
- **Session Storage**: Temporary data persistence

## 🚀 Development & Deployment

### Development Setup
1. **Client Development**: `npm run dev` (Vite dev server)
2. **Server Development**: `npm start` (Nodemon auto-reload)
3. **Admin Server**: `npm start` (Separate admin server)

### Environment Configuration
```env
# Server & Server-Admin
MONGODB_URI=mongodb_connection_string
SESSION_SECRET=session_encryption_key
PORT=4000
JWT_SECRET=jwt_signing_key
```

### Build Process
- **Frontend**: Vite build system with hot reload
- **Backend**: Nodemon for development auto-restart
- **Database**: MongoDB Atlas cloud database
- **Session Store**: MongoDB session persistence

## 📊 Data Flow

### User Journey
1. **Registration/Login** → Authentication → Session Creation
2. **Browse Products** → Category Selection → Product Viewing
3. **Add to Cart/Wishlist** → State Update → Database Sync
4. **Checkout Process** → Cart Review → Order Processing

### Admin Journey
1. **Admin Login** → Admin Authentication → Admin Dashboard
2. **Product Management** → CRUD Operations → Database Updates
3. **Product Monitoring** → View All Products → Analytics

### Data Persistence
- **User Data**: MongoDB user collection
- **Product Data**: MongoDB product collection
- **Session Data**: MongoDB session collection
- **Cart/Wishlist**: Embedded in user documents

## 🔄 Integration Points

### Client-Server Communication
- **REST API**: JSON-based API communication
- **Session Cookies**: Authentication state persistence
- **Error Handling**: Comprehensive error responses
- **Loading States**: UI feedback for async operations

### Database Integration
- **Mongoose ODM**: Object-document mapping
- **Schema Validation**: Data integrity enforcement
- **Population**: Automatic reference resolution
- **Indexing**: Optimized query performance

This architecture ensures separation of concerns, scalability, and maintainability while providing a comprehensive e-commerce solution with distinct user and administrative interfaces.