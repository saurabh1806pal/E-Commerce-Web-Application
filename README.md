# E-Commerce Web Application

A full-stack e-commerce web application built with Node.js, Express.js, MongoDB, and EJS templating engine.

## 📁 Project Structure

```
E-Commerce-Web-Application/
├── client/                     # Frontend client files
└── server/                     # Backend server application
    ├── src/
    │   ├── config/
    │   │   └── db.js          # Database configuration
    │   ├── controllers/
    │   │   ├── admin.controller.js    # Admin functionality
    │   │   ├── auth.controller.js     # Authentication logic
    │   │   └── user.controller.js     # User operations
    │   ├── middlewares/
    │   │   └── redirectIfLoggedIn.js  # Authentication middleware
    │   ├── models/
    │   │   ├── product.model.js       # Product data model
    │   │   └── user.model.js          # User data model
    │   ├── public/
    │   │   ├── css/
    │   │   │   ├── homePage.css       # Home page styles
    │   │   │   └── styleAuth.css      # Authentication styles
    │   │   └── images/                # Static images
    │   ├── routes/
    │   │   ├── admin.routes.js        # Admin routes
    │   │   ├── auth.routes.js         # Authentication routes
    │   │   └── user.routes.js         # User routes
    │   └── views/
    │       ├── admin/
    │       │   ├── add-product.ejs    # Add product page
    │       │   └── all-product.ejs    # Product listing page
    │       ├── auth/
    │       │   ├── header.ejs         # Authentication header
    │       │   ├── login.ejs          # Login page
    │       │   └── signup.ejs         # Registration page
    │       └── users/
    │           ├── cart.ejs           # Shopping cart
    │           ├── details-page.ejs   # Product details
    │           ├── home.ejs           # User home page
    │           ├── profile-page.ejs   # User profile
    │           └── wishlist.ejs       # User wishlist
    ├── .env                    # Environment variables
    ├── index.js               # Main server entry point
    ├── package.json           # Dependencies and scripts
    └── package-lock.json      # Locked dependency versions
```

## 🚀 Features

- **User Authentication**: Login/Signup with session management
- **Admin Panel**: Product management (add, view, edit products)
- **User Dashboard**: Browse products, cart, wishlist, profile
- **Session Management**: MongoDB session store
- **Responsive Design**: CSS styling with potential Tailwind CSS integration

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **EJS** - Templating engine

### Authentication & Security
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **connect-mongodb-session** - MongoDB session store
- **jsonwebtoken** - JWT tokens
- **express-validator** - Input validation

### Development Tools
- **nodemon** - Development server
- **Tailwind CSS** - Utility-first CSS framework
- **multer** - File upload handling

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-Commerce-Web-Application
   ```

2. **Navigate to server directory**
   ```bash
   cd server
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Environment Configuration**
   - Create/update `.env` file with your MongoDB connection string
   - Update the `DB_PATH` in `index.js` with your MongoDB URI

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Access the application**
   - Open your browser and navigate to `http://localhost:4000`

## 🔧 Configuration

### Database Setup
- The application uses MongoDB Atlas by default
- Update the connection string in `index.js` or use environment variables
- Session data is stored in MongoDB using `connect-mongodb-session`

### Environment Variables
Configure the following in your `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
PORT=4000
```

## 📱 Usage

### For Users:
- Register/Login to access the platform
- Browse products on the home page
- Add products to cart and wishlist
- Manage profile information

### For Admins:
- Login with admin credentials
- Access admin panel at `/admin`
- Add new products
- View all products

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.