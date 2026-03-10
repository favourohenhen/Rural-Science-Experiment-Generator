// BrowseExperiments — the main Stage 2 + Stage 3 section.
// Holds filter state (search, subject, topic) and selected experiment state.
// Stage 2: flattens + filters topics[].experiments[].
// Stage 3: shows ExperimentDetailView inline below the card grid.

import { useState, useRef } from 'react'
import type { Subject, Topic, FlatExperiment } from '../types'
import FilterBar from './FilterBar'
import ExperimentBrowseCard from './ExperimentBrowseCard'
import ExperimentDetailView from './ExperimentDetailView'

interface Props {
  subjects: Subject[]
  topics: Topic[]
}

function BrowseExperiments({ subjects, topics }: Props) {
  // ─── Filter state (Stage 2) ──────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedTopic, setSelectedTopic] = useState('all')

  // ─── Selected experiment state (Stage 3) ─────────────────────────────────────
  const [selectedExperiment, setSelectedExperiment] = useState<FlatExperiment | null>(null)

  // Ref used to scroll to the detail view after selecting an experiment.
  const detailRef = useRef<HTMLDivElement>(null)

  // ─── Flatten all experiments from topics[].experiments[] ────────────────────
  const allExperiments: FlatExperiment[] = (topics ?? []).flatMap((topic) =>
    (topic.experiments ?? []).map((exp) => ({
      ...exp,
      topic_id: topic.topic_id,
      topic_name: topic.topic_name,
    }))
  )

  // ─── Apply filters ────────────────────────────────────────────────────────────
  const filtered = allExperiments.filter((exp) => {
    const matchesSubject =
      selectedSubject === 'all' || exp.subject_id === selectedSubject
    const matchesTopic =
      selectedTopic === 'all' || exp.topic_id === selectedTopic
    const matchesSearch =
      searchQuery.trim() === '' ||
      (exp.title ?? '').toLowerCase().includes(searchQuery.trim().toLowerCase())
    return matchesSubject && matchesTopic && matchesSearch
  })

  // ─── Handle card selection ────────────────────────────────────────────────────
  function handleSelect(experiment: FlatExperiment) {
    setSelectedExperiment(experiment)
    // Scroll to the detail panel after React has updated the DOM.
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  function handleClose() {
    setSelectedExperiment(null)
  }

  return (
    <section id="browse-experiments" className="py-10 px-6 bg-stone-50 border-t border-stone-200">
      <div className="max-w-5xl mx-auto">
        {/* Section heading */}
        <h2 className="text-2xl font-bold text-stone-800 mb-1">Browse All Experiments</h2>
        <p className="text-stone-500 text-sm mb-6">
          Filter by subject, topic, or search by title. Click any card to see full details.
        </p>

        {/* Filter bar */}
        <div className="bg-white border border-stone-200 rounded-xl p-5 mb-6 shadow-sm">
          <FilterBar
            searchQuery={searchQuery}
            selectedSubject={selectedSubject}
            selectedTopic={selectedTopic}
            subjects={subjects}
            topics={topics}
            onSearchChange={setSearchQuery}
            onSubjectChange={setSelectedSubject}
            onTopicChange={setSelectedTopic}
          />
        </div>

        {/* Results count */}
        <p className="text-sm text-stone-500 mb-4">
          {filtered.length === 0
            ? 'No experiments match your filters.'
            : `Showing ${filtered.length} experiment${filtered.length === 1 ? '' : 's'}`}
        </p>

        {/* Experiment grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-stone-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium">No experiments found.</p>
            <p className="text-sm mt-1">Try a different subject, topic, or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((exp) => (
              <ExperimentBrowseCard
                key={exp.id}
                experiment={exp}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}

        {/* ── Stage 3: Detail view or placeholder ─────────────────────────────── */}
        <div ref={detailRef}>
          {selectedExperiment ? (
            <ExperimentDetailView
              experiment={selectedExperiment}
              onClose={handleClose}
            />
          ) : (
            <div className="mt-8 text-center py-10 border-2 border-dashed border-stone-200 rounded-2xl text-stone-400">
              <p className="text-3xl mb-2">🔬</p>
              <p className="font-medium text-stone-500">No experiment selected yet.</p>
              <p className="text-sm mt-1">Click "View Experiment" on any card above to see its full details here.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

export default BrowseExperiments

