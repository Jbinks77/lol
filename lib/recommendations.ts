import { ChampionAttributes, DraftState, Recommendation, Role } from './types'
import { CHAMPIONS_DATABASE, getChampionById } from './champions'

interface ScoringBreakdown {
  counterScore: number
  synergyScore: number
  roleScore: number
  damageBalanceScore: number
  riskScore: number
}

function calculateCounterScore(
  champion: ChampionAttributes,
  enemyTeam: string[]
): number {
  if (enemyTeam.length === 0) return 50

  const enemyChamps = enemyTeam.map((id) => getChampionById(id)).filter(Boolean) as ChampionAttributes[]

  let counterPoints = 0
  let totalMatchups = 0

  enemyChamps.forEach((enemy) => {
    if (!enemy) return
    totalMatchups += 2

    // Strong against
    if (champion.strongAgainst.includes(enemy.id)) {
      counterPoints += 2
    }
    // Weak against
    else if (champion.weakAgainst.includes(enemy.id)) {
      counterPoints -= 2
    }
  })

  if (totalMatchups === 0) return 50
  return Math.max(0, Math.min(100, 50 + (counterPoints / totalMatchups) * 25))
}

function calculateSynergyScore(
  champion: ChampionAttributes,
  allyTeam: string[]
): number {
  if (allyTeam.length === 0) return 50

  const allyChamps = allyTeam.map((id) => getChampionById(id)).filter(Boolean) as ChampionAttributes[]

  let synergyPoints = 0
  let totalSlots = Math.max(allyTeam.length, 1)

  allyChamps.forEach((ally) => {
    if (!ally) return

    // Direct synergy
    if (champion.synergizesWith.includes(ally.id)) {
      synergyPoints += 1.5
    }
    // Clash
    else if (champion.clashesWith.includes(ally.id)) {
      synergyPoints -= 1.5
    }

    // Damage balance bonus
    if (champion.primaryDamage !== ally.primaryDamage) {
      synergyPoints += 0.5
    }

    // Style synergy (engage stacking)
    if (
      champion.styles.includes('engage') &&
      ally.styles.includes('engage')
    ) {
      synergyPoints += 0.3
    }

    // Peel synergy
    if (
      champion.styles.includes('peel') &&
      ally.primaryDamage === 'AD'
    ) {
      synergyPoints += 0.3
    }
  })

  return Math.max(0, Math.min(100, 50 + (synergyPoints / totalSlots) * 15))
}

function calculateRoleScore(
  champion: ChampionAttributes,
  selectedRole: Role | null
): number {
  if (!selectedRole) return 70

  if (champion.roles.includes(selectedRole)) {
    return 90 // Primary or secondary role
  }

  return 30 // Off-role
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
  const mixedCount = allyChamps.filter((c) => c.primaryDamage === 'Mixed').length

  const totalDamage = adCount + apCount + mixedCount

  if (totalDamage === 0) return 70

  // If already heavy on one damage type, penalize
  if (champion.primaryDamage === 'AD' && adCount >= 2) {
    return 50
  }
  if (champion.primaryDamage === 'AP' && apCount >= 2) {
    return 50
  }

  // Bonus if we need this damage type
  if (champion.primaryDamage === 'AD' && adCount === 0) return 90
  if (champion.primaryDamage === 'AP' && apCount === 0) return 90

  return 70
}

function calculateRiskScore(
  champion: ChampionAttributes,
  enemyTeam: string[]
): number {
  let risk = 0

  // High difficulty = higher risk
  if (champion.difficulty >= 4) {
    risk += 15
  }

  // Check if heavily countered
  const enemyChamps = enemyTeam
    .map((id) => getChampionById(id))
    .filter(Boolean) as ChampionAttributes[]

  const hardCounters = enemyChamps.filter((e) =>
    champion.weakAgainst.includes(e.id)
  ).length

  if (hardCounters >= 2) {
    risk += 20
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
    const counterScore = calculateCounterScore(champion, draftState.enemyTeam)
    const synergyScore = calculateSynergyScore(champion, draftState.allyTeam)
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

    // Weighted average
    const overallScore = Math.round(
      counterScore * 0.25 +
        synergyScore * 0.25 +
        roleScore * 0.2 +
        damageBalanceScore * 0.2 -
        riskScore * 0.1
    )

    return {
      champion,
      overallScore: Math.max(0, Math.min(100, overallScore)),
      breakdown,
      reasons: generateReasons(champion, breakdown, draftState),
      matchupDetails: generateMatchupDetails(champion, draftState),
      riskLevel: getRiskLevel(breakdown.riskScore),
      tags: generateTags(champion, breakdown, draftState),
    }
  })

  // Sort by overall score descending
  return recommendations.sort((a, b) => b.overallScore - a.overallScore)
}

function generateReasons(
  champion: ChampionAttributes,
  breakdown: ScoringBreakdown,
  draftState: DraftState
): string[] {
  const reasons: string[] = []

  // Counter play
  if (breakdown.counterScore > 60) {
    const hardCounters = draftState.enemyTeam
      .map((id) => getChampionById(id))
      .filter((c) => c && champion.strongAgainst.includes(c.id))
      .map((c) => c!.name)

    if (hardCounters.length > 0) {
      reasons.push(`Fort contre ${hardCounters.slice(0, 2).join(' et ')}`)
    }
  }

  // Synergy
  if (breakdown.synergyScore > 60) {
    const synergies = draftState.allyTeam
      .map((id) => getChampionById(id))
      .filter((c) => c && champion.synergizesWith.includes(c.id))
      .map((c) => c!.name)

    if (synergies.length > 0) {
      reasons.push(`Excellente synergie avec ${synergies[0]}`)
    }
  }

  // Damage balance
  if (breakdown.damageBalanceScore > 75) {
    const teamAD = draftState.allyTeam
      .map((id) => getChampionById(id))
      .filter((c) => c && c.primaryDamage === 'AD').length
    const teamAP = draftState.allyTeam
      .map((id) => getChampionById(id))
      .filter((c) => c && c.primaryDamage === 'AP').length

    if (champion.primaryDamage === 'AD' && teamAP > teamAD) {
      reasons.push('Apporte des dégâts physiques manquants')
    }
    if (champion.primaryDamage === 'AP' && teamAD > teamAP) {
      reasons.push('Apporte des dégâts magiques manquants')
    }
  }

  // Scaling
  if (champion.scalingPotential && draftState.allyTeam.length < 2) {
    reasons.push('Excellent scaling en late game')
  }

  // Early power
  if (champion.earlyGamePower && draftState.allyTeam.length < 1) {
    reasons.push('Forte domination en early game')
  }

  return reasons.length > 0 ? reasons : ['Pick solide et équilibré']
}

function generateMatchupDetails(
  champion: ChampionAttributes,
  draftState: DraftState
): { favorable: string[]; difficult: string[]; neutral: string[] } {
  const favorable: string[] = []
  const difficult: string[] = []
  const neutral: string[] = []

  draftState.enemyTeam.forEach((enemyId) => {
    const enemy = getChampionById(enemyId)
    if (!enemy) return

    if (champion.strongAgainst.includes(enemyId)) {
      favorable.push(enemy.name)
    } else if (champion.weakAgainst.includes(enemyId)) {
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

  // Score-based tags
  if (breakdown.counterScore > 70) tags.push('Counter-pick')
  if (breakdown.synergyScore > 70) tags.push('Bonne synergie')
  if (breakdown.riskScore < 20) tags.push('Safe pick')
  if (breakdown.riskScore > 70) tags.push('Risqué')

  // Style tags
  if (champion.styles.includes('engage')) tags.push('Engage')
  if (champion.styles.includes('tank')) tags.push('Tank')
  if (champion.styles.includes('scaling')) tags.push('Scaling')

  // Power tags
  if (champion.strength >= 8) tags.push('Fort pick')
  if (champion.difficulty >= 4) tags.push('Difficile')

  // Team composition
  if (!draftState.allyTeam.some((id) => {
    const champ = getChampionById(id)
    return champ && champ.styles.includes('tank')
  })) {
    if (champion.styles.includes('tank')) tags.push('Tank needed')
  }

  return [...new Set(tags)].slice(0, 5) // Remove duplicates, max 5
}
