🚀 LeetCode Tracker AI

An AI-powered automated performance tracking platform that helps developers stay consistent and improve their LeetCode problem-solving journey through weekly reports and smart revision plans.

🌟 What It Does

LeetCode Tracker AI allows users to:

🔐 Sign in using Google

👤 Enter their LeetCode username & notification email

📊 Access a personalized performance dashboard

📩 Receive automated weekly performance reports

🤖 Get AI-generated revision plans based on their activity

The system tracks solved problems, analyzes performance, and sends structured insights directly to the user's inbox — fully automated.

🛠️ Tech Stack

Frontend

Next.js (App Router)

TypeScript

Tailwind CSS

NextAuth (Google OAuth)

Automation & Backend

n8n (Workflow Automation)

Webhooks

AI-based report generation

PostgreSQL (used within n8n workflows)

Database

MongoDB (User data & profiles)

⚙️ How It Works

User logs in via Google.

Submits LeetCode username & email.

Data is sent to n8n via webhook.

Automated workflow:

Fetches LeetCode stats

Generates AI performance summary

Creates a revision plan

Sends weekly email report

Each user gets their own dedicated dashboard with tracked progress.
