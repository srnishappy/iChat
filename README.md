# 🗨️ Project Setup Guide

This README provides step-by-step instructions for setting up and deploying the project. Let's get your project up and running in no time! ✨

## 📋 Prerequisites

* Node.js - JavaScript runtime
* Postman - API testing tool
* MongoDB - Database management system

## 🔧 Environment Configuration

### Setup .env file

Create a `.env` file in the root directory of your project and add the following environment variables:

```
MONGODB_URI=...
PORT=5001
JWT_SECRET=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

NODE_ENV=development
```

#### Configuration Details:

1. **MONGODB_URI**: The connection string for your MongoDB database
   - Format: `mongodb://[username:password@]host[:port][/database]`
   - Example: `mongodb://localhost:27017/myproject` or `mongodb+srv://username:password@cluster.mongodb.net/myproject`

2. **PORT**: The port on which your application will run
   - Default is set to 5000, but you can change it according to your needs

3. **JWT_SECRET**: A secret key used for signing JSON Web Tokens
   - This should be a long, random string
   - Example: `your_super_secret_jwt_key_here`

4. **Cloudinary Configuration**: Required for image/file uploads
   - **CLOUDINARY_CLOUD_NAME**: Your Cloudinary cloud name
   - **CLOUDINARY_API_KEY**: Your Cloudinary API key
   - **CLOUDINARY_API_SECRET**: Your Cloudinary API secret
   - These can be obtained from your Cloudinary dashboard after creating an account

5. **NODE_ENV**: The environment in which the application is running
   - Options: `development`, `production`, `test`
   - This affects various behaviors of the application, such as error handling and logging

## 🏗️ Building the Application

To build the application for production use, run:

```
npm run build
```

This command will:
- Transpile JavaScript/TypeScript code
- Bundle and optimize assets
- Create a production-ready version in the `dist` or `build` directory

## 🚀 Starting the Application

To start the application, run:

```
npm start
```

This will start the server on the port specified in your `.env` file (default: 5000).

For development with hot-reloading, you may want to use:

```
npm run dev
```

## 🌐 Accessing the Application

Once started, your application will be available at:
- Local: http://localhost:5000 (or the port you specified)
