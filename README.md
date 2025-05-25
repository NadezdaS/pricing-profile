# Pricing Profile

This is a monorepo full-stack application that allows suppliers to create Pricing Profiles with selected set of products and set price adjustments for each product.
<br />

### 🧰 Tech Stack
- <b>Frontend</b>: React, Vite, TypeScript
- <b>Backend</b>: Express, Node.js, TypeScript
- <b>Testing<b>: Jest (unit testing), Cypress (E2E)
- <b>Data storage</b>: in-memory Array stores the data while application is running
<br />

## ✨ Prerequisites

- `Node.js` (v18+ recommended)
- `npm`, `yarn`, or `pnpm` as your package manager
<br />

## 📦 Install Dependencies

Run the following from the root to install dependencies for both frontend and backend:

```bash
# Using npm workspaces (recommended)
npm install

# OR manually install in each subfolder
cd ./client && npm install
cd ./server && npm install
```
<br />

## 🚀 Running the App
### Start the backend
```bash
cd server
npm run dev
```
Runs the backend on: http://localhost:8080 (or your configured port - can be defined as PORT in ```.env``` file in the ```server``` folder)

### Start the front-end
- Create the .env file in the ```client``` folder and set up your API base url: ```VITE_API_BASE_URL=http://localhost:<port>/api```
- start the client
```bash
cd client
npm run dev
```
Runs the frontend on: http://localhost:5173 (Vite default).

<br />


## 🧪 Running Tests

### Unit tests with Jest
run from the root folder
```bash
npm test
```
### E2E with Cypress
```bash
cd client
npx cypress open --config-file cypress.config.mts
```
<br />

## 📁 Environment Variables
You can configure environment variables in:

- ```client/.env – for Vite (use VITE_ prefix)```
- ```server/.env – for Node.js```

<br />

## 📦 Build for Production
```bash
# Build backend
cd server
npm run build
```

```bash
# Build frontend
cd client
npm run build
```

### 📝 License
MIT – feel free to use and adapt.
