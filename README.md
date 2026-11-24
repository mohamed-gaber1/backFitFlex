# backFitFlex

E-commerce REST API for a fitness store, built with Node.js, Express and MongoDB.

## Features
- JWT authentication with bcrypt password hashing
- Products, categories, offers, banners and featured sections
- Orders and order management
- Image uploads with Multer + Cloudinary
- Request validation with express-validator

## Tech stack
Node.js, Express 5, MongoDB (Mongoose), JWT, Cloudinary, Multer

## Getting started
```bash
npm install
npm run run:dev
```
Create a `.env` file with your MongoDB URI, JWT secret and Cloudinary credentials.

## Project structure
- `models/` - Mongoose models (user, product, category, order, offer, banner, feature, setting)
- `routes/` - API routes
- `controllers/` - Route handlers
- `middlewares/` - Auth and validation middleware
- `config/` - Database configuration
