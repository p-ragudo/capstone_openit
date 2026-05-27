# 5-Min Presentation Script (Mixed Audience)

## Title (0:00 - 0:20)
**Talk track:**
- "Hi everyone, I am presenting OpenIT Capstone, a web app that helps households track appliance usage and estimate electricity costs."
- "In five minutes, I will cover the problem, our solution, how it works, a quick demo flow, and what is next."

## Problem (0:20 - 0:55)
**Talk track:**
- "Most households know their monthly electric bill, but not which appliances drive it."
- "Without usage visibility, it is hard to plan, reduce costs, or compare changes over time."

**Key point:** We need a simple way to track appliance usage and connect it to cost.

## Solution Overview (0:55 - 1:40)
**Talk track:**
- "OpenIT Capstone lets users register, add appliances, log how they are used, and store bill history."
- "The app combines those logs with energy tariff rates to estimate monthly and annual costs."
- "The result is a clearer view of which devices cost the most and how behavior changes impact spending."

## How It Works (1:40 - 2:30)
**Talk track:**
- "The frontend is built in React. It talks to an ASP.NET Core API."
- "All data is stored in a Postgres database."
- "Authentication uses secure cookies, so every user only sees their own data."

**Key point:** End-to-end flow is secure and user-scoped.

## Data and Features (2:30 - 3:30)
**Talk track:**
- "Users add appliances with wattage, location, and inverter status."
- "Usage logs capture hours per day, days per week, and quantity."
- "Bills store energy kWh and total cost for historical comparison."
- "Tariffs store utility rates so the app can calculate estimated costs."

**Key point:** The app links usage, cost, and history in one place.

## Demo Walkthrough (3:30 - 4:15)
**Talk track:**
- "I will log in, add an appliance, enter a usage log, and view the cost estimate."
- "Then I will show the bill history screen and how it tracks monthly totals."

**Key point:** The workflow is fast and mirrors real household tracking.

## Impact and Next Steps (4:15 - 4:50)
**Talk track:**
- "This helps users make smarter energy decisions using their own data."
- "Next steps could include automated recommendations, alerts for spikes, and utility bill import."

## Close (4:50 - 5:00)
**Talk track:**
- "That is OpenIT Capstone in five minutes. Thank you, and I am happy to take questions."

---

## Optional Demo Notes
- If login fails, use a pre-seeded test account.
- Keep the demo tight: add one appliance, one usage log, and show cost estimation.
- If time is short, skip editing flows and go straight to the dashboards.
