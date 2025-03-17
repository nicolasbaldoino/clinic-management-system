# Clinic Management System - Backend

Backend service for the Clinic Management System built with NestJS.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (v14 or higher)

## Installation

```bash
# Install dependencies
$ npm install

# Copy environment variables
$ cp .env.example .env
```

## Configuration

Update the `.env` file with your database credentials and other configuration settings:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/clinic_db
JWT_SECRET=your_jwt_secret
PORT=3000
```

## Running the Application

```bash
# Development mode
$ npm run start:dev

# Production mode
$ npm run build
$ npm run start:prod
```

The application will be available at `http://localhost:3000`

## Testing

```bash
# Unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:
`http://localhost:3000/api`

## Project Structure

```
src/
├── config/         # Configuration files
├── modules/        # Feature modules
├── common/         # Shared resources
└── main.ts         # Application entry point
```
