# Liwanag Q&A (Presentation)

## 1) What problem does Liwanag solve?
It helps Filipino households understand which appliances drive their electricity cost and gives a data-based way to budget and reduce expenses.

## 2) Why focus on electricity costs?
Electricity is a major recurring expense, and appliance usage data is usually hidden from bill totals. Making usage visible supports better daily decisions.

## 3) Who are the target users?
Households and small renters who want to track usage, see estimated costs, and compare with actual bills.

## 4) What is the core user flow?
Register/login, add appliances, log usage, view estimates, and record monthly bills for comparison.

## 5) What technologies did you use?
React + Vite for the frontend, ASP.NET Core for the API, EF Core for data access, and Postgres for storage.

## 6) How is authentication implemented?
ASP.NET Identity with cookie authentication. The login sets a session cookie; protected endpoints require it.

## 7) How do you ensure users only see their own data?
Every entity record stores a user GUID. The API reads the current user ID from the cookie and filters all queries by that ID.

## 8) What data models are central to the system?
Appliance, ApplianceUsageLog, Bill, EnergyTariff, and CostEstimation.

## 9) How do you calculate energy usage in kWh?
In usage logs, kWh is computed from wattage, hours per day, days per week, weeks per month, and quantity, then stored with the log entry.

## 10) Why store kWh directly instead of always computing on the fly?
It speeds up reads, keeps a consistent historical snapshot, and allows manual corrections if needed.

## 11) How do tariffs affect cost estimation?
Tariffs store the rate per kWh with effective dates. Cost estimations apply that rate to usage-derived kWh.

## 12) How are bills used?
Bills store real monthly totals and kWh. Users compare actual bills against estimated costs to validate behavior changes.

## 13) How is the API structured?
Controllers expose REST endpoints, services contain business logic, and EF Core handles persistence.

## 14) What HTTP verbs do you use?
POST to create, GET to read, PUT to update, and DELETE to remove records.

## 15) What are the main endpoints?
Auth, appliances, appliance logs, bills, tariffs, and cost estimations. Each is under `/api/...`.

## 16) Why use dependency injection?
It keeps controllers thin, isolates logic in services, and makes the codebase easier to maintain and test.

## 17) How do you handle validation and errors?
The API validates DTOs on input and returns proper status codes like 400 for bad data and 404 for missing records.

## 18) How do you handle CORS?
The backend allows the frontend origin and enables credentials so cookies can be sent securely.

## 19) What database design decisions are important?
We use relational modeling with foreign keys via EF Core, user-scoped records, and decimal precision for costs and kWh.

## 20) How do you handle migrations?
EF Core migrations are applied automatically on startup in Development to keep schema in sync.

## 21) What is the role of DTOs?
DTOs define the exact data expected from the frontend and keep the API boundary stable and safe.

## 22) Why Postgres?
It is reliable, open source, and supports strong relational constraints and numeric precision.

## 23) What are current limitations?
Costs depend on user-entered data, tariffs are manual, and there is no automated utility bill import yet.

## 24) How would you improve accuracy?
Add reminders, bill upload parsing, or device-based measurement integration for real usage data.

## 25) Is the system scalable?
Yes. The API is stateless, and data is relational. It can scale horizontally behind a load balancer.

## 26) How do you deploy it?
The project supports Docker Compose for local setup; production deployment can use container hosting.

## 27) Why a web app instead of mobile-only?
Web is accessible across devices with no install barrier, especially for shared household usage.

## 28) How does this align with the capstone instruction?
It is a technology-based solution that addresses cost of living by helping households reduce electricity expenses.

## 29) What is the biggest impact?
It turns vague billing totals into actionable usage data, enabling smarter budgeting decisions.

## 30) What are the next steps?
Automated recommendations, tariff updates by region, alerts for spikes, and analytics dashboards.
