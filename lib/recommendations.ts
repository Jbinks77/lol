'use client'

import { ChampionAttributes, DraftState, Recommendation, Role } from './types'
import { CHAMPIONS_DATABASE, getChampionById } from './champions'
import { MATCHUPS_DATABASE, SYNERGIES_DATABASE } from './matchups'

interface ScoringBreakdown {
  counterScore: number
  synergyScore: number
  roleScore: number
  damageBalanceScore: number
  riskScore: number
}

/**
 * Calcule le score de counter-pick
 * Analyse si le champion est fort/faible contre l'équipe ennemie
 */
function calculateCounterScore(
  championId: string,
  enemyTeam: string[]
): number {
  if (enemyTeam.length === 0) return 50

  const matchups = MATCHUPS_DATABASE[championId]
  if (!matchups) return 50

  let counterPoints = 0
  let totalEnemies = 0

  enemyTeam.forEach((enemyId) => {
    totalEnemies++

    // Strong against = +15 points
    if (matchups.strongAgainst.includes(enemyId)) {
      counterPoints += 15
    }
    // Weak against = -15 points
    else if (matchups.weakAgainst.includes(enemyId)) {
      counterPoints -= 15
    }
    // Neutral = 0 points
  })

  // Calcul de la moyenne
  const avgCounter = totalEnemies > 0 ? counterPoints / totalEnemies : 0
  return Math.max(0, Math.min(100, 50 + avgCounter))
}

/**
 * Calcule le score de synergie avec l'équipe alliée
 * Analyse les bonnes/mauvaises combinaisons
 */
function calculateSynergyScore(
  championId: string,
  allyTeam: string[]
): number {
  if (allyTeam.length === 0) return 50

  const synergies = SYNERGIES_DATABASE[championId]
  if (!synergies) return 50

  let synergyPoints = 0
  let totalAllies = 0

  allyTeam.forEach((allyId) => {
    totalAllies++

    // Good synergy = +12 points
    if (synergies.good.includes(allyId)) {
      synergyPoints += 12
    }
    // Bad synergy = -12 points
    else if (synergies.bad.includes(allyId)) {
      synergyPoints -= 12
    }
    // Neutral = 0 points
  })

  // Calcul de la moyenne
  const avgSynergy = totalAllies > 0 ? synergyPoints / totalAllies : 0
  return Math.max(0, Math.min(100, 50 + avgSynergy))
}

/**
 * Calcule le score de compatibilité avec le rôle sélectionné
 */
function calculateRoleScore(
  champion: ChampionAttributes,
  selectedRole: Role | null
): number {
  if (!selectedRole) return 70

  if (champion.roles.includes(selectedRole)) {
    return 90 // Primary or secondary role
  }

  return 30 // Off-role penalty
}

/**
 * Calcule le score d'équilibre des dégâts
 * Encourage la diversité AD/AP pour ne pas avoir une comp one-dimensional
 */
function calculateDamageBalanceScore(
  champion: ChampionAttributes,
  allyTeam: string[]
): number {
  if (allyTeam.length === 0) return 70

  const allyChamps = allyTeam
    .map((id) => getChampionById(id))
    .filter(Boolean) as ChampionAttributes[]

  if (allyChamps.length === 0) return 70

  const adCount = allyChamps.filter((c) => c.primaryDamage === 'AD').length
  const apCount = allyChamps.filter((c) => c.primaryDamage === 'AP').length
  const mixedCount = allyChamps.filter((c) => c.primaryDamage === 'Mixed').length

  const totalDamage = adCount + apCount + mixedCount

  if (totalDamage === 0) return 70

  // Pénalité si déjà 2+ du même type de dégâts
  if (champion.primaryDamage === 'AD' && adCount >= 2) {
    return 35
  }
  if (champion.primaryDamage === 'AP' && apCount >= 2) {
    return 35
  }

  // Bonus si le type de dégâts manque complètement
  if (champion.primaryDamage === 'AD' && adCount === 0) {
    return 95
  }
  if (champion.primaryDamage === 'AP' && apCount === 0) {
    return 95
  }

  // Score normal si balance correcte
  return 70
}

/**
 * Calcule le score de risque
 * Prend en compte la difficulté du champion et les hard-counters
 */
function calculateRiskScore(
  champion: ChampionAttributes,
  enemyTeam: string[]
): number {
  let risk = 0

  // Difficulté élevée = plus de risque
  if (champion.difficulty >= 4) {
    risk += 20
  }
  if (champion.difficulty >= 5) {
    risk += 15
  }

  // Compter les hard-counters
  const matchups = MATCHUPS_DATABASE[champion.id]
  if (matchups && enemyTeam.length > 0) {
    const hardCounters = enemyTeam.filter((id) =>
      matchups.weakAgainst.includes(id)
    ).length

    // Pénalité basée sur nombre de counters
    if (hardCounters >= 3) {
      risk += 40
    } else if (hardCounters === 2) {
      risk += 25
    } else if (hardCounters === 1) {
      risk += 12
    }
  }

  return Math.min(100, risk)
}

/**
 * Génère les raisons principales pour une recommandation
 */
function generateReasons(
  champion: ChampionAttributes,
  breakdown: ScoringBreakdown,
  draftState: DraftState
): string[] {
  const reasons: string[] = []

  // Counter-pick reasons
  if (breakdown.counterScore > 68) {
    const matchups = MATCHUPS_DATABASE[champion.id]
    if (matchups && draftState.enemyTeam.length > 0) {
      const strongMatchups = draftState.enemyTeam
        .filter((id) => matchups.strongAgainst.includes(id))
        .map((id) => getChampionById(id)?.name)
        .filter(Boolean) as string[]

      if (strongMatchups.length > 0) {
        if (strongMatchups.length === 1) {
          reasons.push(`Fort contre ${strongMatchups[0]}`)
        } else {
          reasons.push(`Fort contre ${strongMatchups.slice(0, 2).join(' et ')}`)
        }
      }
    }
  }

  // Synergy reasons
  if (breakdown.synergyScore > 68) {
    const synergies = SYNERGIES_DATABASE[champion.id]
    if (synergies && draftState.allyTeam.length > 0) {
      const goodMatches = draftState.allyTeam
        .filter((id) => synergies.good.includes(id))
        .map((id) => getChampionById(id)?.name)
        .filter(Boolean) as string[]

      if (goodMatches.length > 0) {
        if (goodMatches.length === 1) {
          reasons.push(`Excellente synergie avec ${goodMatches[0]}`)
        } else {
          reasons.push(`Excellente synergie avec ${goodMatches[0]} et ${goodMatches[1]}`)
        }
      }
    }
  }

  // Damage balance reasons
  if (breakdown.damageBalanceScore > 80) {
    if (champion.primaryDamage === 'AD') {
      reasons.push('Équilibre en apportant des dégâts physiques')
    } else if (champion.primaryDamage === 'AP') {
      reasons.push('Équilibre en apportant des dégâts magiques')
    }
  }

  // Role reasons
  if (breakdown.roleScore === 90 && draftState.selectedRole) {
    reasons.push(`Excellent pick pour ${draftState.selectedRole}`)
  }

  // Safe pick reason
  if (breakdown.riskScore < 20) {
    reasons.push('Pick sûr et fiable')
  }

  // Fallback
  if (reasons.length === 0) {
    reasons.push('Bon choix équilibré')
  }

  return reasons
}

/**
 * Génère les détails des matchups (favorable, difficile, neutre)
 */
function generateMatchupDetails(
  championId: string,
  draftState: DraftState
): { favorable: string[]; difficult: string[]; neutral: string[] } {
  const favorable: string[] = []
  const difficult: string[] = []
  const neutral: string[] = []

  const matchups = MATCHUPS_DATABASE[championId]
  if (!matchups) {
    return { favorable, difficult, neutral }
  }

  draftState.enemyTeam.forEach((enemyId) => {
    const enemy = getChampionById(enemyId)
    if (!enemy) return

    if (matchups.strongAgainst.includes(enemyId)) {
      favorable.push(enemy.name)
    } else if (matchups.weakAgainst.includes(enemyId)) {
      difficult.push(enemy.name)
    } else {
      neutral.push(enemy.name)
    }
  })

  return { favorable, difficult, neutral }
}

/**
 * Détermine le niveau de risque (safe, moderate, risky)
 */
function getRiskLevel(riskScore: number): 'safe' | 'moderate' | 'risky' {
  if (riskScore < 25) return 'safe'
  if (riskScore < 60) return 'moderate'
  return 'risky'
}

/**
 * Génère les tags pertinents pour le champion
 */
function generateTags(
  champion: ChampionAttributes,
  breakdown: ScoringBreakdown
): string[] {
  const tags: string[] = []

  // Scoring-based tags
  if (breakdown.counterScore > 70) {
    tags.push('Counter-pick')
  }

  if (breakdown.synergyScore > 70) {
    tags.push('Bonne synergie')
  }

  if (breakdown.riskScore < 25) {
    tags.push('Safe pick')
  }

  if (breakdown.riskScore > 70) {
    tags.push('Risqué')
  }

  // Champion property tags
  if (champion.strength >= 8) {
    tags.push('Fort pick')
  }

  if (champion.difficulty >= 4) {
    tags.push('Difficile')
  }

  if (champion.scalingPotential) {
    tags.push('Scaling')
  }

  if (champion.earlyGamePower) {
    tags.push('Early power')
  }

  // Remove duplicates and limit to 5 tags
  return [...new Set(tags)].slice(0, 5)
}

/**
 * Fonction principale de recommandation
 * Calcule tous les scores et retourne les recommandations triées
 */
export function getRecommendations(
  draftState: DraftState
): Recommendation[] {
  // Filtrer les champions disponibles
  const availableChampions = CHAMPIONS_DATABASE.filter(
    (c) =>
      !draftState.allyTeam.includes(c.id) &&
      !draftState.enemyTeam.includes(c.id) &&
      !draftState.bans.includes(c.id)
  )

  // Appliquer le filtre de rôle si sélectionné
  const filtered =
    draftState.selectedRole === null
      ? availableChampions
      : availableChampions.filter((c) => c.roles.includes(draftState.selectedRole!))

  // Calculer les scores pour chaque champion
  const recommendations = filtered.map((champion) => {
    // Calcul individuel de chaque score
    const counterScore = calculateCounterScore(champion.id, draftState.enemyTeam)
    const synergyScore = calculateSynergyScore(champion.id, draftState.allyTeam)
    const roleScore = calculateRoleScore(champion, draftState.selectedRole)
    const damageBalanceScore = calculateDamageBalanceScore(
      champion,
      draftState.allyTeam
    )
    const riskScore = calculateRiskScore(champion, draftState.enemyTeam)

    // Création du breakdown
    const breakdown: ScoringBreakdown = {
      counterScore,
      synergyScore,
      roleScore,
      damageBalanceScore,
      riskScore,
    }

    // Score global pondéré
    // Counter et Synergy sont les plus importants (30% chacun)
    // Role (20%), Damage Balance (15%), Risk est une pénalité (-5%)
    const overallScore = Math.round(
      counterScore * 0.30 +
        synergyScore * 0.30 +
        roleScore * 0.20 +
        damageBalanceScore * 0.15 -
        riskScore * 0.05
    )

    return {
      champion,
      overallScore: Math.max(0, Math.min(100, overallScore)),
      breakdown,
      reasons: generateReasons(champion, breakdown, draftState),
      matchupDetails: generateMatchupDetails(champion.id, draftState),
      riskLevel: getRiskLevel(breakdown.riskScore),
      tags: generateTags(champion, breakdown),
    }
  })

  // Trier par score global décroissant
  return recommendations.sort((a, b) => b.overallScore - a.overallScore)
}
