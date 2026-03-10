// FilterBar — search input, subject filter buttons, and topic filter buttons.
// All values are passed in as props; no internal state.

import type { Subject, Topic } from '../types'

interface Props {
  searchQuery: string
  selectedSubject: string
  selectedTopic: string
  subjects: Subject[]
  topics: Topic[]
  onSearchChange: (value: string) => void
  onSubjectChange: (subjectId: string) => void
  onTopicChange: (topicId: string) => void
}

function FilterBar({
  searchQuery,
  selectedSubject,
  selectedTopic,
  subjects,
  topics,
  onSearchChange,
  onSubjectChange,
  onTopicChange,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div>
        <label htmlFor="experiment-search" className="block text-sm font-medium text-stone-600 mb-1">
          Search experiments
        </label>
        <input
          id="experiment-search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Type a title to search..."
          className="w-full border border-stone-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
        />
      </div>

      {/* Subject filters */}
      <div>
        <p className="text-sm font-medium text-stone-600 mb-2">Filter by Subject</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSubjectChange('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-150 ${
              selectedSubject === 'all'
                ? 'bg-amber-700 text-white border-amber-700'
                : 'bg-white text-stone-700 border-stone-300 hover:border-amber-400'
            }`}
          >
            All Subjects
          </button>
          {(subjects ?? []).map((subject) => (
            <button
              key={subject.subject_id}
              onClick={() => onSubjectChange(subject.subject_id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-150 ${
                selectedSubject === subject.subject_id
                  ? 'bg-amber-700 text-white border-amber-700'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-amber-400'
              }`}
            >
              {subject.subject_name}
            </button>
          ))}
        </div>
      </div>

      {/* Topic filters */}
      <div>
        <p className="text-sm font-medium text-stone-600 mb-2">Filter by Topic</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onTopicChange('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-150 ${
              selectedTopic === 'all'
                ? 'bg-amber-700 text-white border-amber-700'
                : 'bg-white text-stone-700 border-stone-300 hover:border-amber-400'
            }`}
          >
            All Topics
          </button>
          {(topics ?? []).map((topic) => (
            <button
              key={topic.topic_id}
              onClick={() => onTopicChange(topic.topic_id)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors duration-150 ${
                selectedTopic === topic.topic_id
                  ? 'bg-amber-700 text-white border-amber-700'
                  : 'bg-white text-stone-700 border-stone-300 hover:border-amber-400'
              }`}
            >
              {topic.topic_name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterBar
