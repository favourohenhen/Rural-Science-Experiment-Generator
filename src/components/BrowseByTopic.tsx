// BrowseByTopic — maps topics[] to inline pill badges.
// Uses exact JSON keys: topic_id, topic_name.
// No separate TopicTag component — kept simple as instructed.

import type { Topic } from '../types'

interface Props {
  topics: Topic[]
}

function BrowseByTopic({ topics }: Props) {
  if (!topics || topics.length === 0) {
    return (
      <section className="py-10 px-6 border-t border-amber-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Browse by Topic</h2>
          <p className="text-stone-500">No topics available right now.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 px-6 border-t border-amber-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-stone-800 mb-1">Browse by Topic</h2>
        <p className="text-stone-500 text-sm mb-6">Find experiments by science topic.</p>
        <div className="flex flex-wrap gap-3">
          {topics.map((topic) => (
            <span
              key={topic.topic_id}
              className="bg-white border border-amber-200 text-amber-800 text-sm font-medium px-4 py-2 rounded-full shadow-sm"
            >
              {topic.topic_name || topic.topic_id}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrowseByTopic
