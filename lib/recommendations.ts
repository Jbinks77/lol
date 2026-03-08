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

function calculateCounterScore(
  championId: string,
  enemyTeam: string[]
): number {
  if (enemyTeam.length === 0) return 50

  const matchups = MATCHUPS_DATABASE[championId]
  if (!matchups) return 50

  let counterPoints = 0

  enemyTeam.forEach((enemyId) => {
    // Strong against = +15 points par matchup
    if (matchups.strongAgainst.includes(enemyId)) {
      counterPoints += 15
    }
    // Weak against = -15 points par matchup
    else if (matchups.weakAgainst.includes(enemyId)) {
      counterPoints -= 15
    }
  })

  // Moyenne pondérée
  const avgCounter = counterPoints / Math.max(enemyTeam.length, 1)
  return Math.max(0, Math.min(100, 50 + avgCounter))
}

function calculateSynergyScore(
  championId: string,
  allyTeam: string[]
): number {
  if (allyTeam.length === 0) return 50

  const synergies = SYNERGIES_DATABASE[championId]
  if (!synergies) return 50

  let synergyPoints = 0

  allyTeam.forEach((allyId) => {
    // Good synergy = +12 points
    if (synergies.good.includes(allyId)) {
      synergyPoints += 12
    }
    // Bad synergy = -12 points
    else if (synergies.bad.includes(allyId)) {
      synergyPoints -= 12
    }
  })

  // Moyenne
  const avgSynergy = synergyPoints / Math.max(allyTeam.length, 1)
  return Math.max(0, Math.min(100, 50 + avgSynergy))
}

function calculateRoleScore(
  champion: ChampionAttributes,
  selectedRole: Role | null
): number {
  if (!selectedRole) return 70

  if (champion.roles.includes(selectedRole)) {
    return 90
  }

  return 30
}

function calculateDamageBalanceScore(
  champion: ChampionAttributes,
  allyTeam: string[]
): number {
  if (allyTeam.length === 0) return 70

  const allyChamps = allyTeam
    .map((id) => getChampionById(id))
    .filter(Boolean) as ChampionAttributes[]

  const adCount = allyChamps.filter((c) => c.primaryDamage === 'AD').length
  const apCount = allyChamps.filter((c) => c.primaryDamage === 'AP').length

  const totalDamage = adCount + apCount

  if (totalDamage === 0) return 70

  // Si déjà 2+ du même type, pénalise
  if (champion.primaryDamage === 'AD' && adCount >= 2) {
    return 40
  }
  if (champion.primaryDamage === 'AP' && apCount >= 2) {
    return 40
  }

  // Bonus si type manquant
  if (champion.primaryDamage === 'AD' && adCount === 0) return 90
  if (champion.primaryDamage === 'AP' && apCount === 0) return 90

  return 70
}

function calculateRiskScore(
  champion: ChampionAttributes,
  enemyTeam: string[]
): number {
  let risk = 0

  // Difficulté haute = risque
  if (champion.difficulty >= 4) {
    risk += 20
  }

  // Counters
  const matchups = MATCHUPS_DATABASE[champion.id]
  if (matchups) {
    const hardCounters = enemyTeam.filter((id) =>
      matchups.weakAgainst.includes(id)
    ).length

    if (hardCounters >= 2) {
      risk += 30
    } else if (hardCounters === 1) {
      risk += 15
    }
  }

  return Math.min(100, risk)
}

export function getRecommendations(
  draftState: DraftState
): Recommendation[] {
  const availableChampions = CHAMPIONS_DATABASE.filter(
    (c) =>
      !draftState.allyTeam.includes(c.id) &&
      !draftState.enemyTeam.includes(c.id) &&
      !draftState.bans.includes(c.id)
  )

  // Filter by role if selected
  const filtered =
    draftState.selectedRole === null
      ? availableChampions
      : availableChampions.filter((c) => c.roles.includes(draftState.selectedRole!))

  const recommendations = filtered.map((champion) => {
    const counterScore = calculateCounterScore(champion.id, draftState.enemyTeam)
    const synergyScore = calculateSynergyScore(champion.id, draftState.allyTeam)
    const roleScore = calculateRoleScore(champion, draftState.selectedRole)
    const damageBalanceScore = calculateDamageBalanceScore(
      champion,
      draftState.allyTeam
    )
    const riskScore = calculateRiskScore(champion, draftState.enemyTeam)

    const breakdown: ScoringBreakdown = {
      counterScore,
      synergyScore,
      roleScore,
      damageBalanceScore,
      riskScore,
    }

    // Weighted scoring: counter + synergy sont les plus importants
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
      tags: generateTags(champion, breakdown, draftState),
    }
  })

  // Sort by score
  return recommendations.sort((a, b) => b.overallScore - a.overallScore)
}

function generateReasons(
  champion: ChampionAttributes,
  breakdown: ScoringBreakdown,
  draftState: DraftState
): string[] {
  const reasons: string[] = []

  // Counter plays
  if (breakdown.counterScore > 65) {
    const matchups = MATCHUPS_DATABASE[champion.id]
    if (matchups) {
      const counters = draftState.enemyTeam
        .filter((id) => matchups.strongAgainst.includes(id))
        .map((id) => getChampionById(id)?.name)
        .filter(Boolean)
      if (counters.length > 0) {
        reasons.push(`Fort contre ${counters.slice(0, 2).join(' et ')}`)
      }
    }
  }

  // Synergies
  if (breakdown.synergyScore > 65) {
    const synergies = SYNERGIES_DATABASE[champion.id]
    if (synergies) {
      const goodMatches = draftState.allyTeam
        .filter((id) => synergies.good.includes(id))
        .map((id) => getChampionById(id)?.name)
        .filter(Boolean)
      if (goodMatches.length > 0) {
        reasons.push(`Excellente synergie avec ${goodMatches[0]}`)
      }
    }
  }

  // Damage balance
  if (breakdown.damageBalanceScore > 75) {
    if (champion.primaryDamage === 'AD') {
      reasons.push('Apporte dégâts physiques manquants')
    } else if (champion.primaryDamage === 'AP') {
      reasons.push('Apporte dégâts magiques manquants')
    }
  }

  // Role pick
  if (breakdown.roleScore === 90) {
    reasons.push(`Parfait pour le rôle ${draftState.selectedRole}`)
  }

  if (reasons.length === 0) {
    reasons.push('Pick équilibré et solide')
  }

  return reasons
}

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

function getRiskLevel(riskScore: number): 'safe' | 'moderate' | 'risky' {
  if (riskScore < 25) return 'safe'
  if (riskScore < 60) return 'moderate'
  return 'risky'
}

function generateTags(
  champion: ChampionAttributes,
  breakdown: ScoringBreakdown,
  draftState: DraftState
): string[] {
  const tags: string[] = []

  if (breakdown.counterScore > 70) tags.push('Counter-pick')
  if (breakdown.synergyScore > 70) tags.push('Bonne synergie')
  if (breakdown.riskScore < 25) tags.push('Safe pick')
  if (breakdown.riskScore > 60) tags.push('Risqué')

  if (champion.strength >= 8) tags.push('Fort pick')
  if (champion.difficulty >= 4) tags.push('Difficile')

  if (champion.scalingPotential) tags.push('Scaling')
  if (champion.earlyGamePower) tags.push('Early power')

  return [...new Set(tags)].slice(0, 5)
}
