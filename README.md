# OpenIT Capstone: Energy Monitoring and Cost Insights

## Overview
This project is a full-stack web app for tracking household appliances, logging usage, and estimating electricity costs. It combines a React + Vite frontend with an ASP.NET Core backend and a Postgres database. Users register and log in, add appliances, log usage, record bills, and compare usage against energy tariffs to estimate costs.

## Tech Stack
- Frontend: React 19 + Vite, React Router
- Backend: ASP.NET Core (net10.0), Entity Framework Core, ASP.NET Identity (cookie auth)
- Database: PostgreSQL 16
- Dev Orchestration: Docker Compose

## Project Structure
- backend/: ASP.NET Core API, data models, controllers, and services
- frontend/: React app with pages, contexts, and API client
- docker-compose.yml: Local stack for db + backend + frontend

## How It Works (High-Level Flow)
1. Users register and log in through cookie-based authentication.
2. The frontend sends API requests using `fetch` with cookies (`credentials: include`).
3. The backend reads the authenticated user id from the cookie and scopes all user data by that id.
4. Usage logs and bills are stored in Postgres. Cost estimates use appliance usage and tariffs.

## Backend Details
### Core Concepts
- Authentication: ASP.NET Identity with cookie auth
- Data access: EF Core with Postgres
- Migrations: Auto-applied on startup in Development

### Entities (Database Models)
- ApplicationUser: App user profile
- Appliance: User appliances (name, wattage, inverter flag, location)
- ApplianceCategory: Appliance groupings
- ApplianceUsageLog: Usage entries, calculated kWh and cost
- Bill: Monthly electricity bill totals and components
- EnergyTariff: Utility rates with effective dates
- CostEstimation: Estimated monthly and annual cost profiles
- Notification, Recommendation: Optional records for insights and tips

### API Endpoints (Summary)
Base URL: `/api`

Auth
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/logout` (auth required)
- GET  `/api/auth/user` (auth required)

Appliance Categories
- POST `/api/appliances/categories`
- GET  `/api/appliances/categories`

Appliances (auth required)
- POST `/api/appliances`
- GET  `/api/appliances`
- PUT  `/api/appliances/{id}`
- DELETE `/api/appliances/{id}`

Appliance Usage Logs (auth required)
- POST `/api/appliances/logs`
- GET  `/api/appliances/logs`
- PUT  `/api/appliances/logs/{id}`

Bills (auth required)
- POST `/api/bills`
- GET  `/api/bills`
- PUT  `/api/bills/{id}`
- DELETE `/api/bills/{id}`

Cost Estimations (auth required)
- POST `/api/cost_estimations`
- GET  `/api/cost_estimations`

Energy Tariffs
- POST `/api/tariffs` (auth required)
- GET  `/api/tariffs`

Seed Data (auth required)
- POST `/api/seed/apply`
- DELETE `/api/seed/remove`

### Environment Variables
Backend
- `ASPNETCORE_ENVIRONMENT=Development`
- `ConnectionStrings__Default=Host=...;Port=...;Database=...;Username=...;Password=...`

Frontend
- `VITE_API_BASE=http://localhost:5001`
- `VITE_API_URL=http://localhost:5001/api`

## Frontend Details
- Pages live under `src/pages` and use React Router.
- Contexts in `src/contexts` manage auth, appliances, and bills.
- All API calls flow through `src/services/ApiClient.jsx` to keep fetch and error handling consistent.

## Running Locally (Docker Compose)
From the repo root:
```
docker compose up --build
```
This starts:
- Postgres on port 5433 (container port 5432)
- Backend API on port 5001
- Frontend dev server on port 5173

Open the app at `http://localhost:5173`.

## Running Locally (Without Docker)
### Backend
1. Set `ConnectionStrings__Default` to your Postgres connection string.
2. Run the API:
```
dotnet run --project backend/backend.csproj
```
The API binds to `http://localhost:5000` by default.

### Frontend
```
cd frontend
npm install
npm run dev
```

## Data Notes
- Usage log entries can compute kWh from wattage and usage parameters; cost can be stored or calculated per entry.
- Tariffs define cost per kWh within a date range and are used for cost estimation profiles.

## Troubleshooting
- If login calls return 401, verify cookies are enabled in the browser and that the frontend URL matches allowed CORS origins.
- If migrations fail, verify the Postgres container is healthy and the connection string matches the running db.
