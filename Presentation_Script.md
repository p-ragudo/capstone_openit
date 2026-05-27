# 5-Min Presentation Script (Mixed Audience)

## Title (0:00 - 0:25)
**Talk track:**
- "Hi everyone, I am presenting Liwanag, a web app that helps Filipino households track appliance usage and estimate electricity costs."
- "Liwanag is our technology-based response to the rising cost of living in the Philippines, focused on practical, accessible energy budgeting."
- "In five minutes, I will cover the problem, our solution, how it works, a quick demo flow, and what is next."

## Problem (0:25 - 1:05)
**Talk track:**
- "Filipino households face rising costs, and electricity is a major monthly expense."
- "Most families know their bill, but not which appliances drive it."
- "Without usage visibility, budgeting is hard and cost-saving decisions are guesswork."

**Key point:** We need a simple way to track appliance usage and connect it to cost.

## Solution Overview (1:05 - 1:50)
**Talk track:**
- "Liwanag lets users register, add appliances, log how they are used, and store bill history."
- "The app combines those logs with energy tariff rates to estimate monthly and annual costs."
- "The result is a clearer view of which devices cost the most and how behavior changes impact spending."

## How It Works (1:50 - 2:40)
**Talk track:**
- "On the frontend, we send DTO-shaped JSON for each feature: add appliance, usage log, bill, tariff, and cost estimation."
- "In the API, controllers accept those DTOs and pass them to services; services build the actual entity objects and save them."
- "Our core tables are built around the project idea: Appliance, ApplianceUsageLog, Bill, EnergyTariff, and CostEstimation."
- "Usage logs store hours per day, days per week, weeks per month, quantity, and watts, then compute energy kWh from those values."
- "Bills store monthly totals and kWh so users can compare real costs against estimates."
- "Tariffs store the utility rate per kWh with effective dates, which supports cost estimation profiles."
- "All records are linked to a user GUID, so every query is scoped by the authenticated user.

**Key point:** We implemented a data model that turns appliance usage into kWh and cost, then connects it to bills and tariffs for real, user-specific insights.

## Data and Features (2:40 - 3:40)
**Talk track:**
- "Users add appliances with wattage, location, and inverter status."
- "Usage logs capture hours per day, days per week, and quantity."
- "Bills store energy kWh and total cost for historical comparison."
- "Tariffs store utility rates so the app can calculate estimated costs."

**Key point:** The app links usage, cost, and history in one place.

## Demo Walkthrough (3:40 - 4:25)
**Talk track:**
- "I will log in, add an appliance, enter a usage log, and view the cost estimate."
- "Then I will show the bill history screen and how it tracks monthly totals."

**Key point:** The workflow is fast and mirrors real household tracking.

## Impact and Next Steps (4:25 - 4:55)
**Talk track:**
- "This helps users make smarter energy decisions using their own data, which supports better household budgeting."
- "Next steps could include automated recommendations, alerts for spikes, and utility bill import."

## Close (4:55 - 5:00)
**Talk track:**
- "That is Liwanag in five minutes. Thank you, and I am happy to take questions."

---

## Optional Demo Notes
- If login fails, use a pre-seeded test account.
- Keep the demo tight: add one appliance, one usage log, and show cost estimation.
- If time is short, skip editing flows and go straight to the dashboards.
