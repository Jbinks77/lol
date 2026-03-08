'use client'

import { ChampionAttributes } from './types'

// Données locales de fallback (au cas où l'API échoue)
const FALLBACK_CHAMPIONS: ChampionAttributes[] = [
  { id: 'aatrox', name: 'Aatrox', title: 'The Darkin Blade', roles: ['top'], primaryDamage: 'AD', styles: ['engage', 'burst', 'dps'], difficulty: 3, strength: 8, popularity: 8, strongAgainst: [], weakAgainst: [], synergizesWith: [], clashesWith: [], engageTools: true, peelingTools: false, scalingPotential: true, earlyGamePower: true, teamFightPresence: true },
  { id: 'ahri', name: 'Ahri', title: 'The Nine-Tailed Fox', roles: ['mid'], primaryDamage: 'AP', styles: ['burst', 'poke', 'scaling'], difficulty: 2, strength: 8, popularity: 9, strongAgainst: [], weakAgainst: [], synergizesWith: [], clashesWith: [], engageTools: true, peelingTools: true, scalingPotential: true, earlyGamePower: false, teamFightPresence: true },
]

export let CHAMPIONS_DATABASE: ChampionAttributes[] = FALLBACK_CHAMPIONS

// Fonction pour transformer les données Riot en ChampionAttributes
function transformRiotChampion(key: string, riotData: any): ChampionAttributes {
  // Mapper les rôles depuis les tags Riot
  const roleMap: { [key: string]: any } = {
    'Top': 'top',
    'Jungle': 'jungle',
    'Mid': 'mid',
    'Bot': 'adc',
    'Support': 'support',
  }

  const roles = riotData.tags?.map((tag: string) => roleMap[tag]).filter(Boolean) || ['mid']

  // Mapper le type de dégâts
  const damageTypeMap: { [key: string]: any } = {
    'Physical': 'AD',
    'Magic': 'AP',
    'True': 'True',
  }
  const primaryDamage = damageTypeMap[riotData.info?.attack > riotData.info?.magic ? 'Physical' : 'Magic'] || 'Mixed'

  // Styles basés sur les statistiques Riot
  const styles: any[] = []
  if (riotData.info?.defense > 6) styles.push('tank')
  if (riotData.info?.damage > 7) styles.push('burst', 'dps')
  if (riotData.info?.cc > 6) styles.push('engage')
  if (riotData.info?.difficulty > 6) styles.push('scaling')
  if (styles.length === 0) styles.push('dps')

  return {
    id: key,
    name: riotData.name,
    title: riotData.title,
    roles: roles.length > 0 ? roles : ['mid'],
    primaryDamage: primaryDamage as any,
    styles: styles as any,
    difficulty: Math.ceil((riotData.info?.difficulty || 5) / 2),
    strength: Math.ceil(((riotData.info?.attack || 5) + (riotData.info?.defense || 5) + (riotData.info?.magic || 5)) / 3),
    popularity: Math.floor(Math.random() * 10) + 5,
    strongAgainst: [],
    weakAgainst: [],
    synergizesWith: [],
    clashesWith: [],
    engageTools: styles.includes('engage'),
    peelingTools: styles.includes('tank') || (riotData.info?.cc || 0) > 5,
    scalingPotential: (riotData.info?.difficulty || 0) > 5,
    earlyGamePower: (riotData.info?.attack || 0) > 6,
    teamFightPresence: true,
  }
}

// Charger les champions depuis l'API Riot Data Dragon
export async function loadChampionsFromRiot() {
  try {
    // URL de l'API Riot Data Dragon (gratuit, pas d'authentification)
    const response = await fetch(
      'https://ddragon.leagueoflegends.com/cdn/14.5.1/data/en_US/champion.json'
    )
    const data = await response.json()

    if (data.data) {
      CHAMPIONS_DATABASE = Object.entries(data.data).map(([key, champion]: [string, any]) =>
        transformRiotChampion(key, champion)
      )
      console.log(`✅ Chargé ${CHAMPIONS_DATABASE.length} champions depuis Riot API`)
      return CHAMPIONS_DATABASE
    }
  } catch (error) {
    console.warn('⚠️ Erreur API Riot, utilisation du fallback:', error)
  }

  return CHAMPIONS_DATABASE
}

// Initialiser au chargement côté client
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
