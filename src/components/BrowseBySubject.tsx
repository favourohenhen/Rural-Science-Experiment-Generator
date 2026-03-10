// BrowseBySubject — maps subjects[] to a SubjectCard row.
// Falls back gracefully if the array is empty or missing.

import type { Subject } from '../types'
import SubjectCard from './SubjectCard'

interface Props {
  subjects: Subject[]
}

function BrowseBySubject({ subjects }: Props) {
  if (!subjects || subjects.length === 0) {
    return (
      <section className="py-10 px-6 bg-amber-50 border-t border-amber-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Browse by Subject</h2>
          <p className="text-stone-500">No subjects available right now.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 px-6 bg-amber-50 border-t border-amber-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-stone-800 mb-1">Browse by Subject</h2>
        <p className="text-stone-500 text-sm mb-6">Pick a subject area to explore its experiments.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map((subject) => (
            <SubjectCard key={subject.subject_id} subject={subject} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrowseBySubject
