'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ChampionAttributes } from '@/lib/types'
import { X } from 'lucide-react'

interface ChampionCardProps {
  champion: ChampionAttributes
  onRemove?: () => void
  variant?: 'selected' | 'recommendation'
  onClick?: () => void
  className?: string
}

export const ChampionCard: React.FC<ChampionCardProps> = ({
  champion,
  onRemove,
  variant = 'selected',
  onClick,
  className = '',
}) => {
  const damageColor = {
    AD: 'from-red-600 to-orange-500',
    AP: 'from-blue-600 to-purple-500',
    True: 'from-yellow-600 to-amber-500',
    Mixed: 'from-indigo-600 to-pink-500',
  }[champion.primaryDamage]

  const isSelected = variant === 'selected'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      className={`relative group ${isSelected ? 'cursor-default' : 'cursor-pointer'} ${className}`}
    >
      <div
        className={`
          relative bg-gradient-to-br ${damageColor} rounded-lg p-1
          ${isSelected ? 'ring-2 ring-primary shadow-glow' : 'hover:ring-2 hover:ring-accent'}
          transition-all duration-300
        `}
      >
        {/* Card background */}
        <div className="bg-card-light rounded-md p-3 h-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-display font-bold text-sm text-foreground truncate">
                {champion.name}
              </h3>
              <p className="text-xs text-muted">
                {champion.roles.join(', ')}
              </p>
            </div>
            {onRemove && (
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove()
                }}
                className="p-1 hover:bg-danger/20 rounded transition-colors"
              >
                <X className="w-3 h-3 text-danger" />
              </motion.button>
            )}
          </div>

          {/* Damage type badge */}
          <div className="inline-block px-2 py-1 bg-gradient-to-r rounded text-xs font-semibold text-white mb-2">
            {champion.primaryDamage}
          </div>

          {/* Stats mini */}
          <div className="grid grid-cols-2 gap-1 text-xs text-muted">
            <div>
              <span className="text-foreground font-semibold">{champion.difficulty}</span>/5 Diff
            </div>
            <div>
              <span className="text-foreground font-semibold">{champion.strength}</span>/10 Str
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
