# Lattice — Great Minds Knowledge Graph 

<div align="center">

![Lattice Banner](https://img.shields.io/badge/Lattice-Great%20Minds%20Knowledge%20Graph-1A1B2F?style=for-the-badge&logo=notion&logoColor=white)

</div>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind 4" />
  <img src="https://img.shields.io/badge/TanStack-Start-FF6B6B?style=flat-square" alt="TanStack Start" />
</p>

<p align="center">
  <strong>Study how exceptional people think, decide, fail, revise, and build.</strong>
</p>

<p align="center">
  <em>Evidence-backed research archive for scientists, entrepreneurs, inventors, and technologists.</em>
</p>

---

## 🧭 Project Overview

Lattice is a research-first knowledge platform designed to help users understand not just what remarkable people accomplished, but how they reasoned, what decisions they made, what assumptions they held, what failed, and what evidence exists behind each claim.

This project is not a shallow biography website. It is built around a strong principle:

> Success is not proof of correctness. Famous people are not automatically wise. Outcomes are not the same as good decisions.

The app organizes knowledge as structured entities such as:

- people
- decisions
- failures
- experiments
- technologies
- discoveries
- sources
- lessons
- evidence quality and uncertainty

It treats history and entrepreneurship as a research archive rather than a hero narrative.

---

## 🧠 Core Idea

The platform answers questions like:

- How did this person become who they became?
- What problems did they identify?
- What opportunities did they recognize?
- What assumptions did they make?
- What risks did they accept or reject?
- How did they respond to failure?
- What evidence supports or contradicts their decisions?
- What lessons can a learner extract without romanticizing outcomes?

This is the heart of the project: turning biographies into inspectable decision intelligence.

---

## ✨ What This Project Delivers

### 1) Evidence-aware research archive
Each claim is tracked with provenance, confidence, and source traceability.

### 2) Structured learning objects
Instead of long narrative text only, the platform models:

- people profiles
- life events
- exploration paths
- career milestones
- major decisions
- failures and adaptation
- technologies and discoveries
- evidence-backed lessons

### 3) Search and browse experience
The interface supports searching across people, decisions, failures, technologies, and lessons.

### 4) Knowledge graph feel
The landing experience presents a graph-like view of relationships between a selected person, key decisions, and failure nodes.

### 5) Research rigor
The data model explicitly separates:

- fact
- quote
- documented decision
- reported decision
- interpretation
- research finding
- inference
- controversy
- unknown

---

## 🏗️ Technical Architecture

```text
┌────────────────────────────────────────────────────────────────────┐
│                         User Interface                              │
│  Search • Filter • Browse • Timeline • Knowledge Graph             │
│  React + TanStack Router + Tailwind styling                        │
└───────────────────────────────┬────────────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│                       Data & Domain Layer                           │
│  people.ts • decisions.ts • failures.ts • knowledge.ts             │
│  quotes-lessons.ts • sources.ts • types.ts                         │
│  evidence levels, confidence, and research provenance             │
└───────────────────────────────┬────────────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│                     App Shell & Routing Layer                       │
│  src/routes/ • src/components/ • src/lib/                          │
│  Search results, navigation, shell layout, data access             │
└───────────────────────────────┬────────────────────────────────────┘
                                │
                                ▼
┌────────────────────────────────────────────────────────────────────┐
│                        Runtime / Tooling                            │
│  Vite • TypeScript • Tailwind • React 19 • TanStack Start          │
│  Radix UI • Zustand • Better Auth wiring                          │
└────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Project Structure

```text
Great-Minds-Knowledge-Graph/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   └── research/
│   ├── lib/
│   │   ├── auth/
│   │   ├── data/
│   │   └── db.ts
│   ├── routes/
│   ├── router.tsx
│   ├── styles.css
│   └── routeTree.gen.ts
├── migrations/
│   └── auth/
├── public/
├── scripts/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── prompt.md
├── AGENTS.md
├── startup.sh
└── README.md
```

### Key project areas

- `src/routes/index.tsx` — main landing experience and archive UI
- `src/components/research/` — data cards, filters, graph previews, search experience
- `src/lib/data/` — domain dataset and typed research models
- `src/lib/auth/` — auth scaffolding and identity support
- `migrations/auth/0001_auth.sql` — database schema for auth support
- `public/` — branding, icons, and static assets

---

## 📚 Data Model

The project strongly emphasizes research provenance and structured knowledge representation.

### Core types

- `Person`
- `Decision`
- `Failure`
- `TimelineEvent`
- `Source`
- `Claim`
- `EvidenceLevel`
- `Confidence`
- `Field`
- `Role`

### Research quality model

Each important claim can carry:

- evidence level
- source IDs
- confidence rating
- publication context
- notes or interpretation
- controversy or uncertainty

This makes the app fundamentally more rigorous than a simple “people of interest” site.

---

## 🧪 Strengths of the Project

### ✅ Strong conceptual foundation
The project understands the difference between:

- fact vs opinion
- success vs quality of decision
- direct quote vs interpretation
- historical story vs verified evidence

### ✅ Research-first product framing
The app is designed as a learning system for how people reason, decide, adapt, and build — not just a list of famous names.

### ✅ Diverse domain coverage
The dataset is intentionally broad, spanning:

- science
- engineering
- entrepreneurship
- innovation
- leadership
- creative work
- social impact

### ✅ Good content architecture
The data model is built to support a serious knowledge graph rather than a static portfolio.

### ✅ Modern tooling stack
The app uses a modern frontend stack with strong developer ergonomics and scalable extension paths.

---

## ⚠️ Current Gaps and Improvement Areas

Even with a strong concept, the project is still more of a strong prototype than a fully mature product.

### 1) Mostly static prototype
The current interface is compelling, but deeper product flows are still limited.

### 2) Search is lighter than the concept requires
It is useful as an archive filter, but broader knowledge retrieval could be more powerful.

### 3) Knowledge graph is conceptually strong but still simplified
The graph preview is a good demonstration, but it is not yet a full interactive research graph.

### 4) More user learning flows would deepen value
The project could evolve beyond browsing into:

- side-by-side comparisons
- guided learning paths
- failure-to-adaptation narratives
- editable notes and collections
- topic-based study modules

### 5) Data governance needs stronger editorial workflows
As the dataset scales, the project will need stronger validation and content review standards.

---

## 🗺️ Roadmap Direction

The next evolution should move from a research prototype toward a more complete learning system:

1. Add richer person detail pages
2. Add compare-view workflows between people
3. Expand graph exploration and node navigation
4. Improve evidence and source filtering
5. Build learning journeys and guided study paths
6. Add note-taking and saved research collections
7. Strengthen editorial review and content validation

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19 |
| Router | TanStack Router / TanStack Start |
| Styling | Tailwind CSS 4 |
| Language | TypeScript |
| Build Tool | Vite |
| Component Primitives | Radix UI |
| State | Zustand |
| Data/Queries | TanStack Query |
| Auth scaffolding | Better Auth |
| Data layer | Kysely + Postgres / PGlite |

---

## 🏁 How to Run

From the project root:

```bash
npm install
npm run dev
```

Then open the app in the browser and use the archive interface to explore people, decisions, failures, and lessons.

---

## 🏷️ Builder

<div align="center">

<strong>Builder Name: Ritik</strong>

</div>

---

## 🧾 Summary

Lattice is a distinctive research application that treats exceptional minds as systems to study, not just heroes to admire. It blends modern web architecture with a rigorous historical and research mindset, creating a platform that feels closer to a knowledge graph and research archive than a standard biography website.

It is already a promising concept prototype, and its strongest differentiator is its evidence-aware, source-driven understanding of decision-making, failure, and adaptation.

---

<p align="center">
  <img src="https://img.shields.io/badge/Status-Research%20Prototype-8A2BE2?style=for-the-badge" alt="Status" />
</p>
