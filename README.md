# 🚀 Leet'O Tracker + LeetX AI Mentor

Leet'O Tracker is a full-stack developer growth platform that automatically tracks LeetCode activity, generates AI-powered performance reports, and provides personalized interview preparation through **LeetX**, a context-aware multi-agent AI mentor.

Unlike generic AI chatbots that provide broad advice, LeetX analyzes each user's actual LeetCode performance and delivers personalized guidance, revision plans, and interview coaching based on real coding activity.

🌐Live - https://leetotracker.vercel.app/

---

# 🌟 Key Features

## 📊 LeetCode Performance Tracking

* Connect your LeetCode username.
* Automatically track coding activity and submissions.
* Store user-specific performance history.
* Monitor consistency and progress over time.
* Visual dashboard for coding analytics.

## 🔐 User Authentication

* Custom Signup & Login System.
* Secure user account management.
* Protected dashboard and AI mentor access.
* User-specific performance tracking.

## ⚙️ Automated Weekly Analysis

Users only need to submit their LeetCode username once.

The platform automatically:

* Retrieves LeetCode data using GraphQL APIs.
* Stores performance history in the database.
* Runs scheduled n8n workflows.
* Compares current performance with previous weeks.
* Generates AI-powered insights.
* Delivers structured performance reports.

---

# 🤖 LeetX – Multi-Agent AI Mentor

LeetX is a LangGraph-powered Multi-Agent AI system that acts as a personalized DSA mentor.

Unlike traditional LLM chatbots that generate generic responses, LeetX uses the user's actual LeetCode performance data as context.

This allows the system to generate:

* Personalized revision plans
* Interview preparation guidance
* Topic recommendations
* Performance-based feedback

---

# 🧠 Why LeetX is Different

### Generic AI Chatbots

```text
User → LLM → Generic Advice
```

The model has no knowledge of:

* Problems solved
* Acceptance rate
* Weak topics
* Coding consistency
* Historical progress

---

### LeetX AI Mentor

```text
User Stats
     │
     ▼
Database Context
     │
     ▼
Multi-Agent Workflow
     │
     ▼
Personalized Guidance
```

LeetX knows:

* Total problems solved
* Easy / Medium / Hard distribution
* Topic-wise strengths
* Weak areas
* Acceptance rate
* Historical coding trends

This allows it to provide highly personalized recommendations instead of generic interview advice.

---

# 🏗️ System Architecture

```text
User
 │
 ▼
Submit LeetCode Username
 │
 ▼
Store User Information
 │
 ▼
LeetCode GraphQL API
 │
 ▼
MongoDB Database
 │
 ▼
n8n Workflow Automation
 │
 ├── Fetch Weekly Statistics
 │
 ├── Compare Historical Data
 │
 ├── Generate AI Insights
 │
 └── Send Email Reports
 │
 ▼
LeetX Multi-Agent AI Mentor
 │
 ▼
Personalized Interview & Revision Guidance
```

---

# ⚡ n8n Automation Workflow

The entire reporting pipeline is automated using n8n.

### Weekly Workflow

#### Step 1

Fetch user data from database.

#### Step 2

Retrieve latest LeetCode statistics.

#### Step 3

Analyze:

* Problems solved
* Acceptance rate
* Difficulty distribution
* Topic coverage

#### Step 4

Compare with previous performance.

#### Step 5

Generate AI review and revision plan.

#### Step 6

Create structured reports.

#### Step 7

Send personalized email summaries.

---

# 📈 AI Generated Reports

Every report contains:

### Performance Summary

* Problems solved
* Acceptance rate
* Overall progress

### Topic Analysis

* Strong topics
* Weak topics
* Topic coverage breakdown

### Improvement Areas

* Missing concepts
* Lack of hard problem exposure
* Skill gaps

### Revision Plan

* Recommended topics
* Weekly goals
* Personalized practice suggestions

### Problem Breakdown

* Individual problem analysis
* Attempts vs Accepted
* Performance trends

---

# 🤖 LeetX Multi-Agent Architecture

Built using LangGraph for stateful agent orchestration.

## Database Node

Responsible for:

* Fetching user-specific LeetCode statistics.
* Loading historical performance data.
* Providing context to downstream agents.

## Supervisor Node

Responsible for:

* Intent detection.
* Workflow routing.
* Agent selection.
* Decision making.

## Interview Agent

Responsible for:

* Mock interview sessions.
* DSA interview questions.
* Answer evaluation.
* Personalized interview feedback.

## Revision Agent

Responsible for:

* Revision roadmap generation.
* Weak topic identification.
* Personalized study plans.
* Improvement recommendations.

---

# 🔄 LangGraph Workflow

```text
User Query
      │
      ▼
Database Node
(Fetch User Context)
      │
      ▼
Supervisor Node
(Intent Detection)
      │
 ┌────┴────┐
 │         │
 ▼         ▼
Interview  Revision
Agent      Agent
 │          │
 └────┬─────┘
      ▼
Personalized Response
```

---

# 🎯 Engineering Highlights

* Built a full-stack LeetCode tracking platform.
* Developed automated reporting workflows using n8n.
* Integrated LeetCode GraphQL APIs.
* Created a LangGraph-based Multi-Agent AI Mentor.
* Implemented dynamic agent routing using a Supervisor Agent.
* Built context-aware interview and revision agents.
* Generated AI-powered weekly performance reports.
* Designed personalized learning recommendations using real user data.

---

# 🛠️ Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

## Backend

* FastAPI
* Python
* Uvicorn

## Agentic AI

* LangGraph
* LangChain
* Groq (LLaMA 3)
* Multi-Agent Architecture

## Databases

* MongoDB
* PostgreSQL

## Automation

* n8n

## Data Source

* LeetCode GraphQL API

---

# 🚀 How It Works

### Step 1

User creates an account.

### Step 2

User submits their LeetCode username.

### Step 3

LeetCode statistics are fetched and stored.

### Step 4

n8n automatically runs scheduled analysis.

### Step 5

AI generates weekly reports and revision plans.

### Step 6

LeetX accesses stored user context.

### Step 7

Users ask interview or revision questions.

### Step 8

LeetX provides personalized responses based on actual coding performance.

---

# 👨‍💻 Authors

* Samrat Chauhan
* Ronak Malik

---

# 📄 License

MIT License

---

⭐ If you find this project useful, consider giving it a star on GitHub.
