'use client'

import React, { useState, useMemo } from 'react'
import { CHAMPIONS_DATABASE } from '@/lib/champions'
import { ChampionAttributes } from '@/lib/types'
import { ChampionCard } from './ChampionCard'
import { Search, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChampionSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (champion: ChampionAttributes) => void
  selectedIds: string[]
  excludeIds: string[]
  filterRole?: string | null
}

export const ChampionSelector: React.FC<ChampionSelectorProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedIds,
  excludeIds,
  filterRole,
}) => {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const base = CHAMPIONS_DATABASE.filter(
      (c) => !selectedIds.includes(c.id) && !excludeIds.includes(c.id)
    )

    const byRole = filterRole
      ? base.filter((c) => c.roles.includes(filterRole as any))
      : base

    if (!search.trim()) return byRole

    return byRole.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.id.includes(search.toLowerCase())
    )
  }, [search, selectedIds, excludeIds, filterRole])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card w-full max-w-2xl rounded-xl shadow-card max-h-[80vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="border-b border-card-light p-4 flex justify-between items-center sticky top-0 bg-card">
              <h2 className="font-display font-bold text-lg text-foreground">
                Sélectionner un champion
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-card-light rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-card-light bg-card-light/50">
              <div className="flex items-center gap-2 bg-card rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-muted" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Rechercher un champion..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-foreground placeholder-muted"
                />
              </div>
            </div>

            {/* Champions grid */}
            <div className="overflow-y-auto flex-1 p-4">
              {filtered.length === 0 ? (
                <div className="text-center py-8 text-muted">
                  Aucun champion trouvé
                </div>
              ) : (
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                  layout
                >
                  {filtered.map((champion) => (
                    <motion.div
                      key={champion.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => {
                        onSelect(champion)
                        setSearch('')
                      }}
                    >
                      <ChampionCard
                        champion={champion}
                        variant="recommendation"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
