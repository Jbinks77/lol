'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DraftState, Role, ChampionAttributes } from '@/lib/types'
import { getRecommendations } from '@/lib/recommendations'
import { getChampionById } from '@/lib/champions'
import { ChampionSelector } from '@/components/ChampionSelector'
import { RecommendationCard } from '@/components/RecommendationCard'
import { RoleSelector } from '@/components/RoleSelector'
import { DraftTeam } from '@/components/DraftTeam'
import { Zap, RefreshCw, Sparkles } from 'lucide-react'

export default function DraftPage() {
  const [draftState, setDraftState] = useState<DraftState>({
    allyTeam: [],
    enemyTeam: [],
    bans: [],
    selectedRole: null,
    recommendations: [],
  })

  const [activeSelector, setActiveSelector] = useState<
    'ally' | 'enemy' | 'bans' | null
  >(null)

  // Compute recommendations
  const recommendations = useMemo(() => {
    return getRecommendations(draftState)
  }, [draftState])

  const handleAddAlly = (champion: ChampionAttributes) => {
    setDraftState((prev) => ({
      ...prev,
      allyTeam: [...prev.allyTeam, champion.id],
    }))
    setActiveSelector(null)
  }

  const handleRemoveAlly = (championId: string) => {
    setDraftState((prev) => ({
      ...prev,
      allyTeam: prev.allyTeam.filter((id) => id !== championId),
    }))
  }

  const handleAddEnemy = (champion: ChampionAttributes) => {
    setDraftState((prev) => ({
      ...prev,
      enemyTeam: [...prev.enemyTeam, champion.id],
    }))
    setActiveSelector(null)
  }

  const handleRemoveEnemy = (championId: string) => {
    setDraftState((prev) => ({
      ...prev,
      enemyTeam: prev.enemyTeam.filter((id) => id !== championId),
    }))
  }

  const handleAddBan = (champion: ChampionAttributes) => {
    setDraftState((prev) => ({
      ...prev,
      bans: [...prev.bans, champion.id],
    }))
    setActiveSelector(null)
  }

  const handleRemoveBan = (championId: string) => {
    setDraftState((prev) => ({
      ...prev,
      bans: prev.bans.filter((id) => id !== championId),
    }))
  }

  const handleSelectRole = (role: Role | null) => {
    setDraftState((prev) => ({
      ...prev,
      selectedRole: role,
    }))
  }

  const handleReset = () => {
    setDraftState({
      allyTeam: [],
      enemyTeam: [],
      bans: [],
      selectedRole: null,
      recommendations: [],
    })
  }

  const handleSelectRecommendedChampion = (championId: string) => {
    handleAddAlly(getChampionById(championId)!)
  }


  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-card-light/50 backdrop-blur-sm sticky top-0 z-40 bg-background/80"
        >
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-display text-3xl font-bold gradient-text">
                  League Draft Assistant
                </h1>
                <p className="text-muted text-sm mt-1">
                  Recommandations intelligentes en temps réel
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="p-3 rounded-lg bg-card-light hover:bg-primary/20 transition-colors"
                title="Réinitialiser le draft"
              >
                <RefreshCw className="w-5 h-5 text-primary" />
              </motion.button>
            </div>

            {/* Role selector */}
            <RoleSelector selected={draftState.selectedRole} onChange={handleSelectRole} />
          </div>
        </motion.header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Draft section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            {/* Left column - Teams */}
            <div className="space-y-6">
              <DraftTeam
                title="Équipe Alliée"
                champions={draftState.allyTeam.map((id) => getChampionById(id)!)}
                onAdd={() => setActiveSelector('ally')}
                onRemove={handleRemoveAlly}
                max={5}
              />

              <DraftTeam
                title="Équipe Ennemie"
                champions={draftState.enemyTeam.map((id) => getChampionById(id)!)}
                onAdd={() => setActiveSelector('enemy')}
                onRemove={handleRemoveEnemy}
                max={5}
              />

              <DraftTeam
                title="Champions Bannis"
                champions={draftState.bans.map((id) => getChampionById(id)!)}
                onAdd={() => setActiveSelector('bans')}
                onRemove={handleRemoveBan}
                max={10}
              />
            </div>

            {/* Right column - Stats */}
            <div className="space-y-6">
              {/* Team composition stats */}
              {(draftState.allyTeam.length > 0 || draftState.enemyTeam.length > 0) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {draftState.allyTeam.length > 0 && (
                    <StatCard
                      title="Équipe Alliée"
                      stats={getTeamStats(draftState.allyTeam)}
                    />
                  )}
                  {draftState.enemyTeam.length > 0 && (
                    <StatCard
                      title="Équipe Ennemie"
                      stats={getTeamStats(draftState.enemyTeam)}
                    />
                  )}
                </motion.div>
              )}

              {/* Info card */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-card-light to-card rounded-lg p-6 border border-primary/20"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display font-bold text-foreground">
                      Comment ça marche ?
                    </h3>
                    <p className="text-xs text-muted mt-2">
                      Ajoutez les champions de votre équipe et de l'équipe ennemie.
                      L'algorithme calcule automatiquement les meilleures recommandations en
                      fonction des counter-picks, synergies et équilibre des dégâts.
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-muted">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-accent" />
                    <span>Scoring multi-critères : counter, synergie, rôle, dégâts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-accent" />
                    <span>Explications détaillées pour chaque recommandation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-3 h-3 text-accent" />
                    <span>Risk levels: Safe, Moderate, Risky</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Recommendations section */}
          {recommendations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-6">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Recommandations
                </h2>
                <p className="text-muted">
                  {recommendations.length} champions trouvés, classés par score global
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                  {recommendations.slice(0, 9).map((rec, idx) => (
                    <RecommendationCard
                      key={rec.champion.id}
                      recommendation={rec}
                      rank={idx + 1}
                      onSelectChampion={handleSelectRecommendedChampion}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {recommendations.length > 9 && (
                <div className="text-center mt-6 text-muted text-sm">
                  +{recommendations.length - 9} autres champions disponibles
                </div>
              )}
            </motion.div>
          )}

          {/* Empty state */}
          {recommendations.length === 0 && draftState.allyTeam.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">
                Commençons un nouveau draft
              </h3>
              <p className="text-muted max-w-md mx-auto">
                Sélectionnez les champions de votre équipe et de l'équipe ennemie pour
                obtenir des recommandations intelligentes.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Champion selector modal */}
      <ChampionSelector
        isOpen={activeSelector !== null}
        onClose={() => setActiveSelector(null)}
        onSelect={(champion) => {
          if (activeSelector === 'ally') handleAddAlly(champion)
          else if (activeSelector === 'enemy') handleAddEnemy(champion)
          else if (activeSelector === 'bans') handleAddBan(champion)
        }}
        selectedIds={[...draftState.allyTeam, ...draftState.enemyTeam]}
        excludeIds={draftState.bans}
        filterRole={activeSelector === 'ally' ? draftState.selectedRole : null}
      />
    </div>
  )
}

// Helper component for stats
const StatCard: React.FC<{
  title: string
  stats: { label: string; value: string | number }[]
}> = ({ title, stats }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-card-light rounded-lg p-4 border border-card-light"
  >
    <h4 className="font-semibold text-foreground text-sm mb-3">{title}</h4>
    <div className="space-y-2">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex justify-between items-center text-xs">
          <span className="text-muted">{stat.label}</span>
          <span className="text-foreground font-semibold">{stat.value}</span>
        </div>
      ))}
    </div>
  </motion.div>
)

// Helper function to get team stats
function getTeamStats(
  teamIds: string[]
): { label: string; value: string | number }[] {
  if (teamIds.length === 0) return []

  const champions = teamIds.map((id) => getChampionById(id)!).filter(Boolean)

  const avgDifficulty = Math.round(
    champions.reduce((sum, c) => sum + c.difficulty, 0) / champions.length
  )
  const avgStrength = Math.round(
    champions.reduce((sum, c) => sum + c.strength, 0) / champions.length
  )

  const styles = new Set(champions.flatMap((c) => c.styles))
  const damageTypes = new Set(champions.map((c) => c.primaryDamage))

  return [
    { label: 'Nombre', value: champions.length },
    { label: 'Difficulté moy', value: avgDifficulty },
    { label: 'Force moy', value: avgStrength },
    { label: 'Styles', value: Array.from(styles).slice(0, 2).join(', ') || 'N/A' },
    { label: 'Dégâts', value: Array.from(damageTypes).join(', ') },
  ]
}
