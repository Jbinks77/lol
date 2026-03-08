'use client'

import { ChampionAttributes } from './types'
import { MATCHUPS_DATABASE, SYNERGIES_DATABASE } from './matchups'

const FALLBACK_CHAMPIONS: ChampionAttributes[] = [
  { id: 'aatrox', name: 'Aatrox', title: 'The Darkin Blade', roles: ['top'], primaryDamage: 'AD', styles: ['engage', 'burst', 'dps'], difficulty: 3, strength: 8, popularity: 8, strongAgainst: MATCHUPS_DATABASE['aatrox']?.strongAgainst || [], weakAgainst: MATCHUPS_DATABASE['aatrox']?.weakAgainst || [], synergizesWith: SYNERGIES_DATABASE['aatrox']?.good || [], clashesWith: SYNERGIES_DATABASE['aatrox']?.bad || [], engageTools: true, peelingTools: false, scalingPotential: true, earlyGamePower: true, teamFightPresence: true },
]

export let CHAMPIONS_DATABASE: ChampionAttributes[] = FALLBACK_CHAMPIONS

function transformRiotChampion(key: string, riotData: any): ChampionAttributes {
  const roleMap: { [key: string]: any } = {
    'Top': 'top',
    'Jungle': 'jungle',
    'Mid': 'mid',
    'Bot': 'adc',
    'Support': 'support',
  }

  const roles = riotData.tags?.map((tag: string) => roleMap[tag]).filter(Boolean) || ['mid']

  const attack = riotData.info?.attack || 5
  const magic = riotData.info?.magic || 5
  const primaryDamage = attack > magic ? 'AD' : 'AP'

  const styles: any[] = []
  const defense = riotData.info?.defense || 5
  const cc = riotData.info?.cc || 0
  const difficulty = riotData.info?.difficulty || 5

  if (defense > 6) styles.push('tank')
  if (attack > 7 || magic > 7) styles.push('burst', 'dps')
  if (cc > 6) styles.push('engage')
  if (difficulty > 6) styles.push('scaling')
  if (styles.length === 0) styles.push('dps')

  const difficultyValue = Math.max(1, Math.min(5, Math.ceil(difficulty / 2))) as 1 | 2 | 3 | 4 | 5
  const strengthValue = Math.max(1, Math.min(10, Math.ceil((attack + defense + magic) / 3)))
  const popularityValue = Math.max(1, Math.min(10, Math.floor(Math.random() * 10) + 5))

  // Récupérer les matchups depuis la BD
  const matchups = MATCHUPS_DATABASE[key] || { strongAgainst: [], weakAgainst: [] }
  const synergies = SYNERGIES_DATABASE[key] || { good: [], bad: [] }

  return {
    id: key,
    name: riotData.name,
    title: riotData.title,
    roles: roles.length > 0 ? (roles as any) : ['mid'],
    primaryDamage: primaryDamage as any,
    styles: styles as any,
    difficulty: difficultyValue,
    strength: strengthValue,
    popularity: popularityValue,
    strongAgainst: matchups.strongAgainst,
    weakAgainst: matchups.weakAgainst,
    synergizesWith: synergies.good,
    clashesWith: synergies.bad,
    engageTools: styles.includes('engage'),
    peelingTools: styles.includes('tank') || cc > 5,
    scalingPotential: difficulty > 5,
    earlyGamePower: attack > 6,
    teamFightPresence: true,
  }
}

export async function loadChampionsFromRiot() {
  try {
    const response = await fetch(
      'https://ddragon.leagueoflegends.com/cdn/14.5.1/data/en_US/champion.json'
    )
    const data = await response.json()

    if (data.data) {
      CHAMPIONS_DATABASE = Object.entries(data.data).map(([key, champion]: [string, any]) =>
        transformRiotChampion(key, champion)
      )
      console.log(`✅ Chargé ${CHAMPIONS_DATABASE.length} champions avec matchups`)
      return CHAMPIONS_DATABASE
    }
  } catch (error) {
    console.warn('⚠️ Erreur API Riot:', error)
  }

  return CHAMPIONS_DATABASE
}

if (typeof window !== 'undefined') {
  loadChampionsFromRiot()
}

export function getChampionById(id: string): ChampionAttributes | undefined {
  return CHAMPIONS_DATABASE.find((c) => c.id === id)
}

export function getChampionsByRole(role: string): ChampionAttributes[] {
  return CHAMPIONS_DATABASE.filter((c) => c.roles.includes(role as any))
}

export function searchChampions(query: string): ChampionAttributes[] {
  const lower = query.toLowerCase()
  return CHAMPIONS_DATABASE.filter(
    (c) => c.name.toLowerCase().includes(lower) || c.id.includes(lower)
  )
}
