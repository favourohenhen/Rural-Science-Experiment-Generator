// DemoFlowBanner.tsx — Stage 8 polish component.
// Shows a clear step-by-step demo flow near the top of the page.
// Simplified: text-only steps, no icon clutter.

// const STEPS = [
//   { number: '1', label: 'Select a Topic' },
//   { number: '2', label: 'Perform Experiment' },
//   { number: '3', label: 'Local vs Lab' },
//   { number: '4', label: 'Concept Explanation' },
//   { number: '5', label: 'Exam Practice' },
// ] as const

// export default function DemoFlowBanner() {
//   return (
//     <aside
//       aria-label="Demo flow overview"
//       className="bg-amber-800 border-b border-amber-900"
//     >
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5">
//         <ol
//           className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5"
//           aria-label="Demo steps"
//         >
//           {STEPS.map((step, idx) => (
//             <li key={step.number} className="flex items-center gap-2">
//               <span className="flex items-center gap-1.5 text-xs text-amber-200 whitespace-nowrap">
//                 <span
//                   className="bg-amber-600 text-white font-bold text-xs rounded-full w-4 h-4 flex items-center justify-center shrink-0 leading-none"
//                   aria-hidden="true"
//                 >
//                   {step.number}
//                 </span>
//                 {step.label}
//               </span>
//               {idx < STEPS.length - 1 && (
//                 <span className="text-amber-600 text-xs hidden sm:inline" aria-hidden="true">
//                   ›
//                 </span>
//               )}
//             </li>
//           ))}
//         </ol>
//       </div>
//     </aside>
//   )
// }
