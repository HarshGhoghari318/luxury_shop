# Luxury Shop - E-Commerce Platform

A full-stack e-commerce application for a luxury shop with user authentication, product management, shopping cart functionality, and an admin dashboard.

## 🚀 Features

### User Features
- **User Authentication**: Secure login and signup with JWT tokens
- **Product Browsing**: Browse products by categories (Men, Women, Kids)
- **Shopping Cart**: Add products to cart and manage items
- **User Profile**: View and edit user profile information
- **Order Management**: Track order history

### Owner/Admin Features
- **Product Management**: Add, view, and manage products
- **User Management**: View all registered users
- **Dashboard**: Admin dashboard for managing the store

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage
- **Cookie Parser** - Cookie management
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
luxury_shop/
├── backend/
│   ├── app.js                 # Express server setup
│   ├── models/                # MongoDB models
│   │   ├── user_model.js
│   │   ├── product_model.js
│   │   └── owner_model.js
│   ├── routes/                # API routes
│   │   ├── userRoutes.js
│   │   ├── productRoutes.js
│   │   └── ownerRoutes.js
│   ├── utils/                 # Utility functions
│   │   └── multer.js
│   ├── vercel.json            # Vercel deployment config
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── pages/             # Page components
    │   │   ├── Main.jsx
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Men.jsx
    │   │   ├── Women.jsx
    │   │   ├── Kids.jsx
    │   │   ├── User/          # User pages
    │   │   │   ├── User.jsx
    │   │   │   ├── Home.jsx
    │   │   │   ├── Cart.jsx
    │   │   │   ├── Profile.jsx
    │   │   │   └── EditProfile.jsx
    │   │   └── Owner/         # Owner/Admin pages
    │   │       ├── Owner.jsx
    │   │       ├── AddProduct.jsx
    │   │       ├── AllProduct.jsx
    │   │       └── AllUsers.jsx
    │   ├── components/        # Reusable components
    │   ├── utils/             # Utility functions & context
    │   └── App.jsx            # Main app component
    ├── public/                # Static assets
    └── package.json
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas account)
- **Cloudinary** account (for image storage)

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd luxury_shop
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

### 3. Frontend Setup

```bash
cd ../Frontend
npm install
```

Create a `.env` file in the `Frontend` directory (if needed):

```env
VITE_API_URL=http://localhost:3000
```

## 🚀 Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Production Build

1. **Build the Frontend**
   ```bash
   cd Frontend
   npm run build
   ```

2. **Start the Backend**
   ```bash
   cd backend
   npm start
   ```

## 🌐 API Endpoints

### User Routes (`/users`)
- `POST /users/signup` - Register a new user
- `POST /users/login` - User login
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `POST /users/cart` - Add product to cart
- `GET /users/cart` - Get user cart
- `DELETE /users/cart/:productId` - Remove product from cart

### Product Routes (`/product`)
- `GET /product` - Get all products
- `GET /product/:id` - Get product by ID
- `GET /product/category/:category` - Get products by category

### Owner Routes (`/owner`)
- `POST /owner/login` - Owner login
- `POST /owner/product` - Add new product
- `GET /owner/products` - Get all products (owner view)
- `GET /owner/users` - Get all users
- `PUT /owner/product/:id` - Update product
- `DELETE /owner/product/:id` - Delete product

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Tokens are stored in HTTP-only cookies for security.

## 📦 Database Models

### User Model
- `username` - Unique username
- `email` - Unique email address
- `password` - Hashed password
- `cart` - Array of product references
- `order` - Array of ordered products
- `sex` - User gender
- `address` - User address
- `mobileNo` - Mobile number

### Product Model
- `name` - Product name
- `category` - Product category (Men/Women/Kids)
- `subCategory` - Product subcategory
- `price` - Product price
- `image` - Product image (stored as Buffer or Cloudinary URL)
- `discount` - Discount percentage
- `quantity` - Available quantity

## 🚢 Deployment

The backend is configured for Vercel deployment. The `vercel.json` file contains the deployment configuration.

### Deploying to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy the backend:
   ```bash
   cd backend
   vercel
   ```

3. Deploy the frontend:
   ```bash
   cd Frontend
   vercel
   ```

Make sure to set environment variables in your Vercel project settings.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

Your Name

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- All open-source contributors

---

**Note**: Make sure to keep your `.env` files secure and never commit them to version control. Add `.env` to your `.gitignore` file.

