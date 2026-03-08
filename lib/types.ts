export type Role = 'top' | 'jungle' | 'mid' | 'adc' | 'support'
export type DamageType = 'AD' | 'AP' | 'True' | 'Mixed'
export type ChampionStyle = 'engage' | 'poke' | 'burst' | 'dps' | 'peel' | 'tank' | 'scaling' | 'utility'

export interface ChampionAttributes {
  id: string
  name: string
  title: string
  roles: Role[]
  primaryDamage: DamageType
  styles: ChampionStyle[]
  difficulty: 1 | 2 | 3 | 4 | 5 // 1 = easy, 5 = hard
  strength: number // 1-10
  popularity: number // 1-10
  // Matchups
  strongAgainst: string[] // champion names
  weakAgainst: string[]
  // Synergies
  synergizesWith: string[]
  clashesWith: string[]
  // Utility
  engageTools: boolean
  peelingTools: boolean
  scalingPotential: boolean
  earlyGamePower: boolean
  teamFightPresence: boolean
}

export interface DraftState {
  allyTeam: string[] // Champion IDs
  enemyTeam: string[] // Champion IDs
  bans: string[] // Champion IDs
  selectedRole: Role | null
  recommendations: Recommendation[]
}

export interface Recommendation {
  champion: ChampionAttributes
  overallScore: number
  breakdown: {
    counterScore: number
    synergyScore: number
    roleScore: number
    damageBalanceScore: number
    riskScore: number
  }
  reasons: string[]
  matchupDetails: {
    favorable: string[]
    difficult: string[]
    neutral: string[]
  }
  riskLevel: 'safe' | 'moderate' | 'risky'
  tags: string[]
}

export interface DraftSimulation {
  turn: number
  phase: 'ban' | 'pick'
  team: 'ally' | 'enemy'
  suggestedActions: string[]
}
