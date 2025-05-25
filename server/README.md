# Pricing Profile Server

This is the Express + TypeScript backend for the Pricing Profile Tool. It handles product data, pricing profile logic, and applies dynamic pricing adjustments via API endpoints.

## 🚀 Features
- Serve product data and metadata
- Accept and apply pricing profile configurations
- Calculate adjusted prices


## ⚙️ Tech Stack
- Node.js
- Express
- TypeScript
- Jest (unit testing)

## 🔌 API Endpoints
Implemented API exposed via Swagger: http://localhost:8080/api-docs/#/ (change the port if needed)

### Product endpoints
- `GET /products`: Get products with optional filters
- `GET /products/{id}`: Get product by ID

### Pricing Profile endpoints
- `GET /pricing-profiles`: Get all pricing profiles
- `GET /pricing-profiles/{id}`: Get pricing profile by ID
- `POST /pricing-profiles`: Create a new pricing profile
- `PATCH /pricing-profiles/{id}`: Update a pricing profile
- `DELETE /pricing-profiles/{id}`: Delete a pricing profile

## 📓 Design Decisions & Tradeoffs

### In-Memory Data Store
Products and pricing profiles are stored in memory using simple data structures.
> **Tradeoff:** Fast and stateless, but not persistent. Would need a DB for production readiness.

### Typed Schemas
Shared TypeScript interfaces are used across client/server.
> **Benefit:** Ensures strong typing and reduces mismatch between layers.

### Test Coverage
Jest unit tests cover core logic (e.g., price adjustment calculations).
> **Improvement:** Could be expanded to test API endpoints.


## 💡 If I Had More Time
- Add API endpoints to add / update / delete products
- Add tests for API endpoints
- Add database support (PostgreSQL or NoSQL, depends on the load)
- Introduce input validation (e.g. with Zod)
- Add support for user-specific saved profiles
- Rate limiting or auth for better security

