# ⚔️ League of Legends Draft Assistant

Une application web premium et intelligente pour aider aux décisions de draft en League of Legends.

## 🎯 Fonctionnalités

- **Recommandations intelligentes** basées sur un moteur de scoring multi-critères
- **Counter-picks** et analyse des matchups favorables/difficiles
- **Synergie d'équipe** - détecte les bonnes et mauvaises combinaisons
- **Équilibre des dégâts** - AD/AP/Mixed
- **Risk assessment** - Safe/Moderate/Risky
- **Interface premium** - design gaming élégant et fluide
- **Explications détaillées** - comprendre pourquoi chaque pick est recommandé

## 🛠️ Stack Technique

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **UI Components**: Radix UI, Lucide Icons
- **Architecture**: Composants réutilisables, logique métier séparée

## 📋 Prérequis

- Node.js 18+
- npm ou yarn

## 🚀 Installation et Lancement

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

### 3. Build pour la production

```bash
npm run build
npm start
```

## 📚 Structure du Projet

```
lol-draft-assistant/
├── app/                          # Application Next.js
│   ├── page.tsx                  # Page principale
│   ├── layout.tsx                # Layout global
│   └── globals.css               # Styles globaux
├── components/                   # Composants React réutilisables
│   ├── ChampionCard.tsx          # Carte de champion
│   ├── ChampionSelector.tsx      # Modal de sélection
│   ├── RecommendationCard.tsx    # Carte de recommandation
│   ├── RoleSelector.tsx          # Sélecteur de rôle
│   └── DraftTeam.tsx             # Affichage de l'équipe
├── lib/                          # Logique métier et utilitaires
│   ├── types.ts                  # Types TypeScript
│   ├── champions.ts              # Base de données des champions
│   └── recommendations.ts        # Moteur de recommandation
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
└── README.md
```

## 🎮 Comment utiliser

1. **Sélectionner votre rôle** (optionnel) - Top, Jungle, Mid, ADC, Support
2. **Ajouter les champions de votre équipe** - Cliquez sur "Ajouter" dans "Équipe Alliée"
3. **Ajouter les champions ennemis** - Cliquez sur "Ajouter" dans "Équipe Ennemie"
4. **Ajouter les champions bannis** (optionnel) - Cliquez sur "Ajouter" dans "Champions Bannis"
5. **Consulter les recommandations** - L'app génère automatiquement les meilleurs picks

## 🧮 Moteur de Scoring

Le score global est calculé comme suit:

```
Score = (Counter × 0.25) + (Synergy × 0.25) + (Role × 0.2) + 
         (DamageBalance × 0.2) - (Risk × 0.1)
```

Chaque élément est expliqué dans le détail pour chaque recommandation.

## 📊 Critères d'Évaluation

### Counter-Pick Score
- Analyse des matchups favorables/difficiles
- Bonus si le champion est fort contre plusieurs champions ennemis

### Synergy Score
- Détection des synergies directes
- Bonus pour l'équilibre AD/AP
- Bonus pour les compatibilités de style (engage, peel, etc.)

### Role Score
- 90 si le champion correspond au rôle sélectionné
- 30 si off-role

### Damage Balance Score
- Encourage la diversité AD/AP/Mixed
- Pénalise l'accumulation d'un type de dégât

### Risk Score
- Difficulté de joueur du champion
- Nombre de hard counters ennemis

## 🎨 Design

- **Thème**: Sombre, luxe discret, gaming premium
- **Animations**: Framer Motion pour transitions fluides
- **Responsive**: Desktop-first, mobile correct
- **Accessibilité**: Contraste élevé, hiérarchie visuelle claire

## 🔄 Évolutions Futures

- [ ] Intégration API League of Legends (Riot API)
- [ ] Données champion en temps réel (win rates, ban rates)
- [ ] Sauvegarde des drafts
- [ ] Mode simulation de draft complet
- [ ] Statistiques personnalisées par elo
- [ ] Historique des recommandations
- [ ] Mode light
- [ ] Localisation complète

## 📝 Notes de Développement

### Ajouter de nouveaux champions

Modifiez `lib/champions.ts` et ajoutez un objet `ChampionAttributes` au tableau `CHAMPIONS_DATABASE`:

```typescript
{
  id: 'new-champ',
  name: 'New Champion',
  title: 'The Title',
  roles: ['mid'],
  primaryDamage: 'AP',
  styles: ['burst', 'scaling'],
  difficulty: 3,
  strength: 8,
  // ... autres propriétés
}
```

### Modifier les critères de scoring

Editez les fonctions dans `lib/recommendations.ts`:
- `calculateCounterScore`
- `calculateSynergyScore`
- `calculateRoleScore`
- `calculateDamageBalanceScore`
- `calculateRiskScore`

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à:
- Ajouter des champions
- Améliorer l'algorithme de scoring
- Proposer des nouvelles fonctionnalités
- Corriger les bugs

## 📄 License

MIT License - voir LICENSE pour les détails

---

**Fait avec ❤️ pour la communauté League of Legends**

Besoin d'aide ? Consultez la documentation Next.js: https://nextjs.org/docs
