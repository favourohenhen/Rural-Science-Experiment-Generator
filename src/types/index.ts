// ─── Quiz ────────────────────────────────────────────────────────────────────

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

// ─── Experiment (full, as found inside topics[].experiments[]) ────────────────

export interface Experiment {
  id: string;
  title: string;
  subject_id: string;
  subject_name: string;
  short_description?: string;
  materials?: string[];
  local_alternatives?: string[];
  instructions?: string[];
  safety_notes?: string[];
  concept_explanation?: string;
  diagram_hint?: string;
  quiz?: QuizQuestion[];
}

// ─── Featured Experiment (slim, as found in featured_experiments[]) ───────────

export interface FeaturedExperiment {
  id: string;
  title: string;
  topic_id: string;
  topic_name: string;
  subject_id: string;
  subject_name: string;
}

// ─── Subject (as found in subjects[]) ────────────────────────────────────────

export interface Subject {
  subject_id: string;
  subject_name: string;
}

// ─── Topic (as found in topics[]) ────────────────────────────────────────────

export interface Topic {
  topic_id: string;
  topic_name: string;
  experiments: Experiment[];
}

// ─── Root data shape ──────────────────────────────────────────────────────────

export interface ExperimentsData {
  featured_experiments: FeaturedExperiment[];
  subjects: Subject[];
  topics: Topic[];
}

// ─── Flat experiment ─────────────────────────────────────────────────────────
// An Experiment with topic_id and topic_name attached.
// Built at runtime by flattening topics[].experiments[] in BrowseExperiments.

export interface FlatExperiment extends Experiment {
  topic_id: string;
  topic_name: string;
}
