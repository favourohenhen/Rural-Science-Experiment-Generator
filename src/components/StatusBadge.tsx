// StatusBadge.tsx — Stage 8 polish component.
// A small reusable pill badge for experiment attributes.
// Variants: safe | everyday | waec | offline
// Usage: <StatusBadge variant="safe" />

export type BadgeVariant = 'safe' | 'everyday' | 'waec' | 'offline'

interface Props {
  variant: BadgeVariant
  className?: string
}

const CONFIG: Record<BadgeVariant, { label: string; icon: string; classes: string }> = {
  safe: {
    label: 'Safe',
    icon: '✅',
    classes: 'bg-green-100 text-green-800 border-green-200',
  },
  everyday: {
    label: 'Everyday Materials',
    icon: '🏡',
    classes: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  waec: {
    label: 'WAEC-Friendly',
    icon: '📝',
    classes: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  offline: {
    label: 'Offline Ready',
    icon: '📶',
    classes: 'bg-stone-100 text-stone-700 border-stone-200',
  },
}

export default function StatusBadge({ variant, className = '' }: Props) {
  const { label, icon, classes } = CONFIG[variant]
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${classes} ${className}`}
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </span>
  )
}
