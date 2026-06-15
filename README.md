# 🚀 LeetX – AI-Powered LeetCode Performance Tracker & Multi-Agent DSA Mentor

LeetX is a full-stack developer growth platform that tracks LeetCode activity, analyzes coding performance, automates progress reporting, and provides personalized DSA mentorship through a LangGraph-powered Multi-Agent AI system.

The platform combines real-time LeetCode analytics, workflow automation, and Agentic AI to help developers improve problem-solving skills, prepare for coding interviews, and maintain consistent learning habits.

🌐 **Live Demo:** https://leetotracker.vercel.app/

---

# ✨ Features

### 🔐 Custom Authentication System

* User Signup & Login functionality.
* Secure credential-based authentication.
* Protected user dashboard and AI mentor access.
* Session management and user-specific data handling.

### 📊 LeetCode Performance Tracking

* Track coding activity and submission statistics.
* Monitor problem-solving consistency.
* View personalized analytics dashboard.
* Compare current performance with historical trends.

### 🤖 Multi-Agent AI Mentor

LeetX includes a LangGraph-powered AI mentorship system that dynamically routes user requests to specialized agents.

#### 🎯 Interview Agent

* Conducts mock DSA interviews.
* Generates coding interview questions.
* Evaluates user responses.
* Provides scoring and detailed feedback.

#### 📚 Revision Agent

* Creates personalized revision roadmaps.
* Recommends topics based on weak areas.
* Generates structured study plans.
* Adapts recommendations using LeetCode performance data.

### 🧠 Intelligent Agent Routing

* Intent detection using a Supervisor Agent.
* Dynamic routing between AI agents.
* Shared workflow state across nodes.
* Context-aware conversations and recommendations.

### 📧 Automated Weekly Reports

* AI-generated performance summaries.
* Weekly progress analysis.
* Historical performance comparison.
* Automated email delivery.

---

# 🏗️ Multi-Agent Architecture

```text
User Query
      │
      ▼
Database Node
(Fetch User Stats)
      │
      ▼
Supervisor Node
(Intent Detection)
      │
 ┌────┴─────┐
 │          │
 ▼          ▼
Interview   Revision
Agent       Agent
 │           │
 └─────┬─────┘
       ▼
AI Response
       │
       ▼
Frontend Chat Interface
```

---

# 🤖 AI Workflow

## Database Node

* Fetches user-specific LeetCode statistics.
* Retrieves historical performance data.
* Provides context to downstream agents.

## Supervisor Node

* Detects user intent.
* Decides which agent should handle the request.
* Manages workflow execution.

## Interview Agent Node

* Generates interview questions.
* Evaluates responses.
* Provides scoring and feedback.
* Simulates real technical interviews.

## Revision Agent Node

* Creates revision plans.
* Identifies weak topics.
* Generates personalized study recommendations.

---

# ⚡ LangGraph Features

* Stateful Agent Workflows
* Conditional Edge Routing
* Shared State Management
* Context Persistence
* Dynamic Agent Selection
* Multi-Agent Coordination
* Graph-Based Workflow Execution

---

# 🔄 Automation Pipeline

```text
LeetCode Data
      │
      ▼
MongoDB Storage
      │
      ▼
n8n Workflow
      │
      ▼
AI Analysis
      │
      ▼
Report Generation
      │
      ▼
PostgreSQL Storage
      │
      ▼
Email Delivery
```

### Automated Tasks

* Fetch LeetCode statistics.
* Store user performance data.
* Generate AI-powered reports.
* Compare historical progress.
* Send weekly email summaries.

---

# 🧩 Tech Stack

## Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* React

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

## Authentication

* Custom Signup/Login System
* Session-Based Authentication

---

# 🎯 Engineering Highlights

* Developed a LangGraph-based Multi-Agent AI mentorship system.
* Implemented graph-based workflow orchestration with shared state management.
* Built intelligent routing using a Supervisor Agent and conditional edges.
* Designed personalized DSA revision and interview coaching agents.
* Integrated FastAPI APIs for real-time AI interactions.
* Automated user performance analysis and email reporting using n8n.
* Created a scalable and modular Agentic AI architecture.

---

# 🚀 How It Works

### Step 1

User creates an account and logs in.

### Step 2

User connects their LeetCode profile.

### Step 3

LeetCode activity and statistics are collected.

### Step 4

The AI Mentor fetches relevant performance data.

### Step 5

Supervisor Agent identifies user intent.

### Step 6

Request is routed to either:

* Interview Agent
* Revision Agent

### Step 7

AI generates personalized mentorship and recommendations.

### Step 8

Weekly reports are generated and delivered automatically.

---

# 📂 Project Components

```text
Frontend (Next.js)
│
├── Authentication
├── Dashboard
├── Analytics
└── AI Chat Interface

Backend (FastAPI)
│
├── LangGraph Workflow
├── Database Services
├── API Endpoints
└── AI Agents

Automation (n8n)
│
├── Data Collection
├── Report Generation
└── Email Delivery
```

---

# 🔮 Future Enhancements

* Voice-Based Mock Interviews
* Contest Performance Analytics
* Company-Specific Interview Preparation
* AI-Powered Progress Forecasting
* Advanced Skill Gap Analysis
* Personalized Placement Roadmaps

---

# 👨‍💻 Authors

* Samrat Chauhan
* Ronak Malik

---



⭐ If you found this project useful, consider giving it a star on GitHub.
