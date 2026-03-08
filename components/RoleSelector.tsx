'use client'

import React from 'react'
import { Role } from '@/lib/types'
import { motion } from 'framer-motion'

interface RoleSelectorProps {
  selected: Role | null
  onChange: (role: Role | null) => void
}

const ROLES: { id: Role; label: string; icon: string }[] = [
  { id: 'top', label: 'Top', icon: '⛅' },
  { id: 'jungle', label: 'Jungle', icon: '🌳' },
  { id: 'mid', label: 'Mid', icon: '🌪️' },
  { id: 'adc', label: 'ADC', icon: '🏹' },
  { id: 'support', label: 'Support', icon: '🛡️' },
]

export const RoleSelector: React.FC<RoleSelectorProps> = ({ selected, onChange }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onChange(null)}
        className={`px-4 py-2 rounded-lg font-semibold transition-all ${
          selected === null
            ? 'bg-primary text-white shadow-glow'
            : 'bg-card-light text-muted hover:text-foreground'
        }`}
      >
        Tous les rôles
      </motion.button>
      {ROLES.map((role) => (
        <motion.button
          key={role.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(selected === role.id ? null : role.id)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
            selected === role.id
              ? 'bg-primary text-white shadow-glow'
              : 'bg-card-light text-muted hover:text-foreground'
          }`}
        >
          <span>{role.icon}</span>
          <span>{role.label}</span>
        </motion.button>
      ))}
    </div>
  )
}
