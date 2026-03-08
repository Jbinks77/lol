'use client'

import React from 'react'
import { ChampionCard } from './ChampionCard'
import { ChampionAttributes } from '@/lib/types'
import { Plus } from 'lucide-react'
import { motion } from 'framer-motion'

interface DraftTeamProps {
  champions: ChampionAttributes[]
  onAdd: () => void
  onRemove: (championId: string) => void
  title: string
  max?: number
}

export const DraftTeam: React.FC<DraftTeamProps> = ({
  champions,
  onAdd,
  onRemove,
  title,
  max = 5,
}) => {
  const isFull = champions.length >= max

  return (
    <div>
      <h3 className="font-display font-bold text-foreground mb-3 text-sm uppercase tracking-wider">
        {title}
        <span className="text-muted ml-2">({champions.length}/{max})</span>
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
        {champions.map((champion) => (
          <ChampionCard
            key={champion.id}
            champion={champion}
            onRemove={() => onRemove(champion.id)}
            variant="selected"
          />
        ))}

        {!isFull && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAdd}
            className="bg-card-light hover:bg-primary/10 border-2 border-dashed border-muted hover:border-primary rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all group"
          >
            <Plus className="w-6 h-6 text-muted group-hover:text-primary transition-colors mb-1" />
            <span className="text-xs text-muted group-hover:text-primary font-semibold">
              Ajouter
            </span>
          </motion.button>
        )}
      </div>
    </div>
  )
}
