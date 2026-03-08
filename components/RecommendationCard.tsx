'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Recommendation } from '@/lib/types'
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

interface RecommendationCardProps {
  recommendation: Recommendation
  rank: number
  onSelectChampion: (championId: string) => void
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  rank,
  onSelectChampion,
}) => {
  const { champion, overallScore, breakdown, reasons, matchupDetails, riskLevel, tags } =
    recommendation

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'safe':
        return 'text-success'
      case 'moderate':
        return 'text-accent'
      case 'risky':
        return 'text-danger'
    }
  }

  const getRiskBgColor = () => {
    switch (riskLevel) {
      case 'safe':
        return 'bg-success/10'
      case 'moderate':
        return 'bg-accent/10'
      case 'risky':
        return 'bg-danger/10'
    }
  }

  const scoreColor =
    overallScore >= 75 ? 'text-success' : overallScore >= 50 ? 'text-accent' : 'text-danger'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
      className="bg-gradient-to-br from-card-light to-card rounded-lg overflow-hidden hover:shadow-glow transition-all duration-300 border border-card-light hover:border-primary/30"
    >
      <div className="p-4">
        {/* Header avec rank et champion */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-sm">
              {rank}
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-lg text-foreground">
                {champion.name}
              </h3>
              <p className="text-xs text-muted">{champion.title}</p>
            </div>
          </div>

          {/* Score principal */}
          <div className="flex flex-col items-end">
            <div className={`text-2xl font-bold ${scoreColor}`}>
              {overallScore}
            </div>
            <span className="text-xs text-muted">/ 100</span>
          </div>
        </div>

        {/* Info bar */}
        <div className="grid grid-cols-4 gap-2 mb-3 text-xs">
          <div className="bg-card rounded px-2 py-1">
            <div className="text-muted">Diff</div>
            <div className="text-foreground font-semibold">{champion.difficulty}/5</div>
          </div>
          <div className="bg-card rounded px-2 py-1">
            <div className="text-muted">Force</div>
            <div className="text-foreground font-semibold">{champion.strength}/10</div>
          </div>
          <div className="bg-card rounded px-2 py-1">
            <div className="text-muted">Pop</div>
            <div className="text-foreground font-semibold">{champion.popularity}/10</div>
          </div>
          <div className={`${getRiskBgColor()} rounded px-2 py-1`}>
            <div className={`text-xs ${getRiskColor()}`}>
              {riskLevel === 'safe' && 'Safe'}
              {riskLevel === 'moderate' && 'Modéré'}
              {riskLevel === 'risky' && 'Risqué'}
            </div>
          </div>
        </div>

        {/* Reasons */}
        <div className="mb-3 bg-card rounded p-2">
          <h4 className="text-xs font-semibold text-accent mb-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Pourquoi ce pick ?
          </h4>
          <ul className="text-xs space-y-1">
            {reasons.map((reason, i) => (
              <li key={i} className="text-muted flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Matchups */}
        {(matchupDetails.favorable.length > 0 || matchupDetails.difficult.length > 0) && (
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            {matchupDetails.favorable.length > 0 && (
              <div className="bg-success/10 rounded p-2 border border-success/20">
                <p className="font-semibold text-success flex items-center gap-1 mb-1">
                  <CheckCircle className="w-3 h-3" />
                  Favorable
                </p>
                <p className="text-muted">{matchupDetails.favorable.slice(0, 2).join(', ')}</p>
              </div>
            )}
            {matchupDetails.difficult.length > 0 && (
              <div className="bg-danger/10 rounded p-2 border border-danger/20">
                <p className="font-semibold text-danger flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3 h-3" />
                  Difficile
                </p>
                <p className="text-muted">{matchupDetails.difficult.slice(0, 2).join(', ')}</p>
              </div>
            )}
          </div>
        )}

        {/* Scoring breakdown */}
        <div className="bg-card rounded p-2 mb-3">
          <h4 className="text-xs font-semibold text-accent mb-2">Détail du scoring</h4>
          <div className="space-y-1 text-xs">
            <ScoreBar label="Counter-pick" value={breakdown.counterScore} />
            <ScoreBar label="Synergie" value={breakdown.synergyScore} />
            <ScoreBar label="Rôle" value={breakdown.roleScore} />
            <ScoreBar label="Dégâts" value={breakdown.damageBalanceScore} />
            <ScoreBar
              label="Risque"
              value={breakdown.riskScore}
              inverse
            />
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action button */}
        <button
          onClick={() => onSelectChampion(champion.id)}
          className="w-full mt-3 px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-foreground font-semibold rounded-lg hover:shadow-glow transition-all duration-300 text-sm"
        >
          Sélectionner ce champion
        </button>
      </div>
    </motion.div>
  )
}

const ScoreBar: React.FC<{ label: string; value: number; inverse?: boolean }> = ({
  label,
  value,
  inverse = false,
}) => {
  const displayValue = inverse ? 100 - value : value
  const color =
    displayValue >= 75 ? 'bg-success' : displayValue >= 50 ? 'bg-accent' : 'bg-danger'

  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <div className="flex-1 mx-2 bg-card-light rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full ${color} transition-all`}
          style={{ width: `${displayValue}%` }}
        />
      </div>
      <span className="text-foreground font-semibold w-8 text-right">
        {Math.round(value)}
      </span>
    </div>
  )
}
