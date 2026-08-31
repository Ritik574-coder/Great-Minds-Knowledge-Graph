# Great Minds Knowledge Graph — Project Overview and Improvement Plan

## 1) Project overview

This project is a research-oriented knowledge platform for studying how exceptional people think, decide, fail, adapt, communicate, and build. The core idea is not a simple biography site. It aims to turn historical and business narratives into structured, evidence-aware learning objects:

- people
- decisions
- experiments
- failures
- discoveries
- technologies
- sources
- lessons
- controversies
- evidence quality

The product intent is clearly described in `prompt.md`: the system should help users understand not just what a person achieved, but how they reasoned, what assumptions they made, what risks they accepted, and what evidence supports those claims.

The current codebase is a strong prototype for that direction. It uses a React + TanStack Start application with a styled single-page interface and a large static dataset of famous scientists, builders, inventors, and entrepreneurs. The data model emphasizes provenance and source transparency, which is one of the project’s strongest ideas.

## 2) What the project is trying to build

The project is effectively a “decision intelligence archive” for exceptional minds. It is structured around a few principles:

- separate fact from interpretation
- tie claims to sources
- expose uncertainty, controversy, and gaps
- study decision quality, not only outcome
- emphasize reasoning patterns over hero worship

The intended user experience is closer to a knowledge graph / research archive than to a typical blog or portfolio. That is a good conceptual direction, and it makes the product distinct.

## 3) Project structure and architecture

The repository structure shows a mostly frontend-heavy app with a rich data layer:

- `src/routes/index.tsx` — main product page and primary UI
- `src/components/layout/shell.tsx` — top-level app shell and nav
- `src/lib/data/` — core domain data and typed models
- `src/lib/auth/` — auth-related support scaffolding
- `src/lib/db.ts` — database bridge / persistence logic
- `migrations/auth/0001_auth.sql` — DB schema for auth support
- `public/` — static assets and branding resources
- `scripts/` — app environment, migration, preview, and build tooling

### Core data architecture

The strongest part of the project is the data model in `src/lib/data/types.ts` and the dataset files such as:

- `people.ts`
- `people-scientists.ts`
- `people-builders.ts`
- `decisions.ts`
- `decisions-builders.ts`
- `failures.ts`
- `knowledge.ts`
- `sources.ts`
- `quotes-lessons.ts`

This layer is unusually thoughtful because it tracks:

- evidence level
- source IDs
- confidence levels
- historical context
- controversy and uncertainty
- decision options and tradeoffs
- research gaps

That is exactly the right foundation for a serious knowledge graph.

## 4) Current strengths

### A. Strong conceptual foundation
The project clearly understands the difference between:

- fact
- quote
- interpreted lesson
- reported story
- disputed claim
- unknown information

This is rare in educational or historical product work, and it is one of the project’s biggest advantages.

### B. Research-first design
The dataset is not just a biography list. It models:

- decisions and alternatives
- experiments and outcomes
- failure and adaptation
- sources and provenance
- anti-survivorship thinking

This is substantially better than a standard “famous people” website.

### C. Good product positioning
The “study how exceptional minds decide, fail, revise, and build” framing is strong. It gives the project a clear identity and a learning outcome beyond simple entertainment.

### D. Broad domain coverage
The project intentionally includes a diverse mix of people from different fields, backgrounds, and historical periods. That is important and demonstrates a clear design decision against shallow, overly narrow hero narratives.

### E. Solid front-end scaffolding
The app uses modern tooling: Vite, React, TypeScript, Tailwind, and TanStack router patterns. The structure is clean enough to extend into a more complete product.

## 5) Where the project needs improvement

### 1. The app is still mostly a static prototype, not a true product
Right now the app feels like a compelling concept demo rather than a finished user-facing platform. The landing page is visually strong, but there are limited deeper interactions beyond browsing static cards and a simplified graph preview.

What is missing:

- detailed per-person pages
- deep comparison views between people
- search across claims, sources, and lessons
- filtering by evidence quality
- interactive graph exploration
- drill-down into case studies

This is the biggest gap. The dataset is rich, but the product experience has not yet matched the data depth.

### 2. Data is large but not yet systematized for product use
The dataset is a strong foundation, but it is still essentially a large, typed static object library. For a production product, the data should be transformed into a more operational system:

- normalized entities
- relation tables
- queryable graph structures
- versioned datasets
- source lineage tracking
- editorial review workflows

Without this, the app will struggle to scale beyond a prototype.

### 3. Search and discovery are too shallow
The search box exists, but the current implementation is only a lightweight filter over people. It does not handle rich information retrieval across:

- decisions
- failures
- experiments
- lessons
- source excerpts
- evidence categories
- person-to-person comparisons

A knowledge graph without strong navigational search is hard to use. This is a major underdeveloped area.

### 4. The graph preview is not yet a real knowledge graph experience
The `GraphPreview` is a static SVG summary, which is useful as a concept, but it is not interactive. The app is marketed as a “knowledge graph,” but the current experience is closer to a static dashboard with a toy network.

To match the product promise, the project needs:

- node/edge navigation
- relation inspection
- graph clustering by industry/topic
- person-to-decision-to-failure linking
- clickable nodes with drill-through details

### 5. There is not enough user value beyond reading data
The app currently reads like a curated archive rather than a learning system. Users likely need more than static cards and summaries.

Missing features:

- guided learning paths
- compare two people side-by-side
- “what changed in decision quality over time?” views
- “what failed, what adapted, what worked?” flows
- topic-based study modules
- takeaways for learners
- exportable notes or reading lists

The platform could become much more educational and memorable with a structured learning layer.

### 6. The content ambition is high, but editorial rigor needs stronger workflows
The project correctly emphasizes provenance and evidence, but this creates an operational challenge: the dataset is very large and may become inconsistent over time.

Needed improvements:

- validation for missing source links
- source quality audits
- editorial flags for disputed claims
- claim-to-source traceability checks
- conflict resolution between competing narratives
- easier update paths for new people and new facts

Without review infrastructure, the project may drift into uneven data quality.

### 7. Data quality and consistency need stronger governance
The data is rich, but with this much historical material, consistency becomes difficult. Areas to tighten:

- naming conventions
- slug consistency
- evidence label standards
- source type normalization
- confidence updates
- duplicate entities across datasets
- timeline ordering and narrative ambiguity control

This is a normal issue for research-heavy knowledge products, but it needs a clear editorial system.

### 8. The app needs more concrete user flows
Right now the experience is mostly a landing page with selection. Good product flows would include:

- browse by field
- browse by era
- compare trait patterns
- follow a decision cluster
- explore a person’s failure-to-adaptation journey
- read a source-backed case study

As it stands, the app is stronger as a concept than as a task-driven product.

### 9. Auth and persistence are not yet meaningfully integrated
There is auth support in the repository, but the actual product does not yet appear to use it meaningfully. This is not inherently bad for a prototype, but the architecture suggests a future direction for:

- private notes
- saved reading lists
- personal research collections
- highlighting and annotations
- shared study groups

If the product later adds personalization, the current structure is ready to support it, but it is not yet built around a real user need.

### 10. Accessibility and UX detail still need attention
The visual design is polished, but a serious research product must also excel in usability. Improvement areas include:

- keyboard navigation
- screen-reader labels
- focus states
- mobile experience depth
- better content hierarchy on dense pages
- stronger responsiveness for large datasets
- accessible tables and comparisons

### 11. Performance and scalability are not yet validated under real dataset growth
The current app loads a static dataset at runtime, which is fine for a demo. But for a broader product, it must handle:

- larger source libraries
- thousands of claims
- richer graph entities
- search indexing
- pagination or virtualized lists
- lazy loading
- caching strategies

Otherwise the product may degrade quickly as content grows.

### 12. The project needs clearer “why this matters” framing for learners
The product is intellectually strong, but it could be even more compelling if it answered a learner’s questions more directly:

- Why does this person’s decision matter?
- What was the decision environment?
- What could have gone differently?
- What should a learner take away?
- What is evidence quality here?

The code already contains many of these ideas, but the product experience should make them more explicit, guided, and teachable.

## 6) Recommended next-step roadmap

### Phase 1 — Product validation
- define the exact audience: students, researchers, general learners, founders, or broader curiosity users
- choose a core workflow: browse, compare, explore, or study
- reduce scope to 2–3 high-value flows

### Phase 2 — Data infrastructure
- move from static arrays to normalized entities and queryable collections
- create source validation and evidence checks
- establish editorial workflow for claims and conflicts

### Phase 3 — Deep product experience
- create person detail pages
- create decision explainer pages
- add side-by-side comparison screens
- build richer interactive graph navigation
- add stronger search/filter UX

### Phase 4 — Learning and retention
- add learning paths and structured takeaways
- provide deeper explanation of assumptions, risks, alternatives, and tradeoffs
- highlight what the evidence does and does not prove

### Phase 5 — Scale and maintainability
- add indexing, caching, and performant queries
- implement test coverage for data integrity
- improve accessibility and mobile polish
- set up a sustainable content review process

## 7) Bottom line

This is a very promising project with a strong intellectual foundation and a differentiated idea. The biggest strengths are its evidence-aware design, ambitious conceptual framing, and rich source-driven dataset. The biggest weaknesses are that it still reads like an impressive prototype rather than a fully realized learning product.

The next step is not more random content expansion. The next step is to convert the strong conceptual model into a richer, more navigable product experience with deeper interactions, stronger data infrastructure, and a clearer learning workflow.

If the team can do that, this project could become a genuinely valuable platform for studying how exceptional people think and decide.
