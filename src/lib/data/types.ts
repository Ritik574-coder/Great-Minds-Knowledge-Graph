export type EvidenceLevel =
  | "fact"
  | "direct_quote"
  | "documented_decision"
  | "reported"
  | "research_finding"
  | "interpretation"
  | "inference"
  | "controversy"
  | "unknown";

export type Confidence = "high" | "medium" | "low" | "disputed";

export type SourceType =
  | "primary"
  | "secondary"
  | "archival"
  | "official"
  | "academic"
  | "interview"
  | "speech"
  | "patent"
  | "paper"
  | "letter"
  | "government"
  | "other";

export type Field =
  | "physics"
  | "chemistry"
  | "biology"
  | "mathematics"
  | "computer-science"
  | "engineering"
  | "medicine"
  | "information-theory"
  | "space"
  | "energy"
  | "software"
  | "hardware"
  | "media"
  | "retail"
  | "finance"
  | "consumer-goods"
  | "environment"
  | "social-innovation"
  | "telecommunications"
  | "pharmaceuticals"
  | "entertainment"
  | "agriculture";

export type Role =
  | "scientist"
  | "researcher"
  | "inventor"
  | "engineer"
  | "entrepreneur"
  | "investor"
  | "manager"
  | "communicator"
  | "social-innovator"
  | "mathematician";

export type LifeStage =
  | "early-life"
  | "education"
  | "early-interest"
  | "first-experiments"
  | "early-career"
  | "first-major-problem"
  | "opportunity-recognition"
  | "first-major-decision"
  | "building"
  | "failure-setback"
  | "adaptation"
  | "breakthrough"
  | "scaling"
  | "major-crisis"
  | "transformation"
  | "later-work"
  | "legacy";

export type DecisionCategory =
  | "strategic"
  | "operational"
  | "technical"
  | "financial"
  | "hiring"
  | "product"
  | "market"
  | "scientific"
  | "research"
  | "communication"
  | "partnership"
  | "investment"
  | "risk-management"
  | "crisis-response"
  | "ethical";

export type DecisionStyle =
  | "data-driven"
  | "experience-driven"
  | "intuition-driven"
  | "experiment-driven"
  | "principle-driven"
  | "mixed";

export type Reversibility = "reversible" | "irreversible" | "partially-reversible" | "unknown";
export type Uncertainty = "high" | "medium" | "low" | "unknown";
export type Impact = "high" | "medium" | "low" | "unknown";
export type Tempo = "fast" | "slow" | "deliberate" | "unknown";
export type OutcomeQuality = "positive" | "negative" | "mixed" | "pending" | "unknown";
export type DecisionQuality =
  | "reasonable-given-information"
  | "lucky"
  | "incorrect-model-that-worked"
  | "correct-model"
  | "externally-caused"
  | "disputed"
  | "unknown";

export type EventKind =
  | "life"
  | "education"
  | "career"
  | "decision"
  | "experiment"
  | "failure"
  | "breakthrough"
  | "technology"
  | "company"
  | "publication"
  | "controversy"
  | "quote"
  | "crisis"
  | "communication";

export interface Claim {
  text: string;
  evidence: EvidenceLevel;
  confidence: Confidence;
  sourceIds: string[];
  quote?: string;
  notes?: string;
  eventDate?: string;
}

export interface Source {
  id: string;
  title: string;
  author: string;
  year: number | string;
  type: SourceType;
  publisher?: string;
  url?: string;
  excerpt?: string;
  notes?: string;
}

export interface SourceConflict {
  id: string;
  topic: string;
  claimA: Claim;
  claimB: Claim;
  resolution?: string;
}

export interface Education {
  institution: string;
  years: string;
  focus?: string;
  notes?: string;
  evidence: EvidenceLevel;
  sourceIds: string[];
}

export interface CareerItem {
  org: string;
  role: string;
  years: string;
  notes?: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  date?: string;
  title: string;
  stage: LifeStage;
  kind: EventKind;
  summary: string;
  evidence: EvidenceLevel;
  confidence: Confidence;
  sourceIds: string[];
  relatedIds?: string[];
  quote?: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  chosen: boolean;
  reasoning?: string;
  evidence: EvidenceLevel;
}

export interface Decision {
  id: string;
  slug: string;
  personId: string;
  title: string;
  year: number;
  date?: string;
  categories: DecisionCategory[];
  styles: DecisionStyle[];
  reversibility: Reversibility;
  uncertainty: Uncertainty;
  impact: Impact;
  tempo: Tempo;
  context: string;
  problem: string;
  availableInformation: string;
  unknownInformation: string;
  goal: string;
  options: DecisionOption[];
  chosen: string;
  rejected: string[];
  reasoning: string;
  assumptions: string[];
  risksAccepted: string[];
  risksRejected: string[];
  resources: string;
  constraints: string;
  timePressure: string;
  peopleInvolved: string[];
  communication: string;
  execution: string;
  shortTerm: string;
  longTerm: string;
  whatWorked: string;
  whatFailed: string;
  whatChanged: string;
  outcome: OutcomeQuality;
  decisionQuality: DecisionQuality;
  qualityVsOutcome: string;
  evidence: EvidenceLevel;
  confidence: Confidence;
  sourceIds: string[];
  lessons: string[];
  relatedFailureIds?: string[];
  relatedExperimentIds?: string[];
}

export interface Experiment {
  id: string;
  personId: string;
  title: string;
  year: number;
  question: string;
  hypothesis?: string;
  method: string;
  observation: string;
  result: string;
  revision?: string;
  outcome: "success" | "failure" | "mixed" | "inconclusive";
  evidence: EvidenceLevel;
  sourceIds: string[];
}

export interface Failure {
  id: string;
  slug: string;
  personId: string;
  title: string;
  year: number;
  whatHappened: string;
  why: string;
  knownBefore: string;
  misunderstood: string;
  decisionId?: string;
  externalFactors: string;
  learned: string;
  changedAfter: string;
  repeated: "yes" | "no" | "partially" | "unknown";
  evidence: EvidenceLevel;
  confidence: Confidence;
  sourceIds: string[];
}

export interface Breakthrough {
  id: string;
  slug: string;
  personId: string;
  title: string;
  year: number;
  kind: "scientific" | "technical" | "business" | "social" | "communication";
  summary: string;
  priorWork: string;
  whatWasNew: string;
  impact: string;
  evidence: EvidenceLevel;
  sourceIds: string[];
}

export interface Technology {
  id: string;
  slug: string;
  name: string;
  year: number;
  personIds: string[];
  problem: string;
  constraint: string;
  existing: string;
  novelIdea: string;
  architecture?: string;
  tradeoffs: string;
  deployment?: string;
  adoption?: string;
  impact: string;
  sourceIds: string[];
}

export interface Discovery {
  id: string;
  slug: string;
  personId: string;
  title: string;
  year: number;
  question: string;
  existingKnowledge: string;
  unknown: string;
  hypothesis?: string;
  method: string;
  result: string;
  competingHypotheses?: string;
  peerCriticism?: string;
  publication?: string;
  replication?: string;
  impact: string;
  sourceIds: string[];
}

export interface Quote {
  id: string;
  personId: string;
  text: string;
  year?: number;
  context: string;
  audience?: string;
  sourceIds: string[];
  evidence: EvidenceLevel;
  notes?: string;
}

export interface Principle {
  id: string;
  personId: string;
  title: string;
  statement: string;
  evidence: EvidenceLevel;
  sourceIds: string[];
  notes?: string;
}

export interface CommunicationRecord {
  id: string;
  personId: string;
  title: string;
  year: number;
  audience: string;
  objective: string;
  framing: string;
  technique: string;
  tone: string;
  excerpt?: string;
  evidence: EvidenceLevel;
  sourceIds: string[];
}

export interface Controversy {
  id: string;
  personId: string;
  title: string;
  year?: number;
  facts: string;
  criticisms: string;
  counterarguments: string;
  legal?: string;
  uncertainty: string;
  historicalContext: string;
  sourceIds: string[];
}

export interface SuccessFactor {
  factor:
    | "timing"
    | "technology"
    | "market"
    | "capital"
    | "team"
    | "distribution"
    | "network"
    | "skill"
    | "luck"
    | "risk"
    | "persistence"
    | "strategy"
    | "communication"
    | "execution"
    | "external-environment";
  role: string;
  evidence: EvidenceLevel;
  sourceIds: string[];
}

export interface Lesson {
  id: string;
  title: string;
  personIds: string[];
  relatedIds: string[];
  whatHappened: string;
  whyItMatters: string;
  whatToLearn: string;
  whatToQuestion: string;
  evidenceNote: string;
  uncertain: string;
  reflection: string[];
  mentalModel?: string;
}

export interface Pattern {
  id: string;
  title: string;
  hypothesis: string;
  mechanism: string;
  supportingCaseIds: string[];
  contradictingCaseIds: string[];
  supportCount: number;
  caution: string;
  evidence: EvidenceLevel;
}

export interface GraphNode {
  id: string;
  kind:
    | "person"
    | "decision"
    | "failure"
    | "breakthrough"
    | "technology"
    | "discovery"
    | "company"
    | "principle"
    | "experiment";
  label: string;
  sublabel?: string;
  personId?: string;
  year?: number;
  x: number;
  y: number;
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
  rel:
    | "made"
    | "experienced"
    | "created"
    | "based-on"
    | "resulted-in"
    | "collaborated-with"
    | "competed-with"
    | "enabled"
    | "followed-by"
    | "learned-from"
    | "contradicts"
    | "mentored"
    | "worked-at";
  label: string;
}

export interface Person {
  id: string;
  slug: string;
  name: string;
  sortName: string;
  honorific?: string;
  birth: { year: number; date?: string; place: string };
  death?: { year: number; date?: string; place: string };
  nationality: string[];
  gender: string;
  fields: Field[];
  roles: Role[];
  knownFor: string;
  summary: string;
  thinking: string;
  initials: string;
  era: string;
  countries: string[];
  mode: ("scientist" | "entrepreneur" | "inventor" | "social")[];
  research: {
    sourceCount: number;
    primarySourceCount: number;
    secondarySourceCount: number;
    completeness: number;
    confidence: Confidence;
    gaps: string[];
  };
  education: Education[];
  career: CareerItem[];
  timeline: TimelineEvent[];
  decisionIds: string[];
  failureIds: string[];
  experimentIds: string[];
  breakthroughIds: string[];
  technologyIds: string[];
  discoveryIds: string[];
  quoteIds: string[];
  principles: Principle[];
  communications: CommunicationRecord[];
  controversies: Controversy[];
  successFactors: SuccessFactor[];
  antiSurvivorship: string;
  collaborators: { name: string; relation: string; personId?: string }[];
  companies: string[];
  lessonIds: string[];
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  summary: string;
  personIds: string[];
  decisionIds: string[];
  lessonIds: string[];
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  summary: string;
  steps: { title: string; body: string; href: string }[];
  questions: string[];
}

export interface CompareDimension {
  id: string;
  label: string;
  description: string;
}

export interface PersonCompareNote {
  personId: string;
  dimensionId: string;
  note: string;
  evidence: EvidenceLevel;
  sourceIds: string[];
}

export interface SearchHit {
  kind: "person" | "decision" | "failure" | "technology" | "discovery" | "quote" | "lesson" | "source" | "topic" | "breakthrough" | "experiment";
  id: string;
  slug: string;
  title: string;
  snippet: string;
  personId?: string;
}
