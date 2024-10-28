
# Next.js Authentication with JWT and Nodemailer

This project is a Next.js authentication system that uses **JSON Web Tokens (JWT)** for session management, **Nodemailer** for email verification and password recovery, and **MongoDB** for database management. It includes secure user registration, login, and password recovery features.

## Features

- **User Registration** with email verification
- **JWT Authentication** for secure session management
- **Forgot Password** with recovery email link
- **MongoDB** integration for user data
- **Next.js API Routes** for backend services

## Tech Stack

- **Next.js**: Frontend framework with SSR capabilities
- **MongoDB**: Database for user information
- **JWT**: Token-based authentication
- **Nodemailer**: Sends verification and recovery emails
- **TypeScript**: Ensures type safety and code quality

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AshKatale/nextjs-auth.git
   cd nextjs-auth
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with these variables:
   ```plaintext
   MONGO_URL=<your-mongodb-uri>
   TOKEN_SECRET=<your-jwt-secret>
   DOMAIN=<domain>
   NODEMAILER_USER=<your-email>
   NODEMAILER_PASS=<your-password>
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

- Register and verify email to activate accounts
- Use forgot password functionality to reset the password through an email link

## Folder Structure

- `pages/api`: API routes for authentication
- `helpers`: Contains utility functions like `getDataFromToken`, and mailer services
- `models`: MongoDB schema for users

## License

This project is licensed under the MIT License.
