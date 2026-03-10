// useSavedExperiments.ts
// Custom React hook for saving and removing experiments using localStorage.
//
// Storage key : 'rse_saved'
// Storage format: JSON array of FlatExperiment objects
//
// All reads are wrapped in try/catch so a corrupted value never crashes the app.

import { useState, useEffect } from 'react'
import type { FlatExperiment } from '../types'

const STORAGE_KEY = 'rse_saved'

// ── Helper: safely read the saved list from localStorage ─────────────────────
function readFromStorage(): FlatExperiment[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    // Make sure we always return an array
    return Array.isArray(parsed) ? parsed : []
  } catch {
    // Corrupted data — reset to empty
    return []
  }
}

// ── Helper: write the saved list to localStorage ──────────────────────────────
function writeToStorage(experiments: FlatExperiment[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(experiments))
  } catch {
    // localStorage might be full or unavailable — fail silently
  }
}

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useSavedExperiments() {
  const [saved, setSaved] = useState<FlatExperiment[]>([])

  // Load saved experiments from localStorage once on mount
  useEffect(() => {
    setSaved(readFromStorage())
  }, [])

  // Save state → localStorage on every change
  useEffect(() => {
    writeToStorage(saved)
  }, [saved])

  // ── Check if an experiment is already saved ────────────────────────────────
  function isSaved(id: string): boolean {
    return saved.some((exp) => exp.id === id)
  }

  // ── Add an experiment to the saved list ───────────────────────────────────
  function saveExperiment(experiment: FlatExperiment): void {
    if (isSaved(experiment.id)) return // already saved, do nothing
    setSaved((prev) => [...prev, experiment])
  }

  // ── Remove an experiment from the saved list ──────────────────────────────
  function removeExperiment(id: string): void {
    setSaved((prev) => prev.filter((exp) => exp.id !== id))
  }

  return { saved, isSaved, saveExperiment, removeExperiment }
}
