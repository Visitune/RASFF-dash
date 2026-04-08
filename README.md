# RASFF Dashboard

Tableau de bord interactif pour la gestion et l'analyse des alertes RASFF (Rapid Alert System for Food and Feed).

## Architecture du projet

```
rasff-dash/
├── src/
│   ├── App.tsx                 # Composant principal - routing et state global
│   ├── main.tsx                # Point d'entrée React
│   ├── index.css              # Styles globaux (Tailwind + CSS variables)
│   ├── components/            # Composants UI
│   │   ├── analytics/          # Graphiques et tableaux analytiques
│   │   │   ├── FilterBar.tsx   # Filtres (catégorie, pays, risque, date)
│   │   │   ├── StatsSummary.tsx# Résumé statistiques (totaux, moyennes)
│   │   │   ├── TrendChart.tsx  # Graphique d'évolution temporelle
│   │   │   ├── DistributionChart.tsx # Distribution par catégorie
│   │   │   ├── NotificationsTable.tsx # Tableau des notifications
│   │   │   ├── RiskHeatmap.tsx # Carte thermique des risques
│   │   │   ├── CorrelationMatrix.tsx # Matrice de corrélation
│   │   │   ├── AnomalyDetector.tsx # Détection des anomalies
│   │   │   ├── SeasonalChart.tsx # Analyse saisonnière
│   │   │   └── AIInsightCard.tsx # Carte d'insight IA
│   │   ├── predictive/         # Modèles prédictifs
│   │   │   ├── HypothesisPanel.tsx # Panel de sélection des hypothèses
│   │   │   ├── HypothesisResult.tsx # Résultat des tests d'hypothèses
│   │   │   └── ForecastChart.tsx # Prévisions
│   │   ├── geo/               # Visualisations géographiques
│   │   │   ├── WorldMap.tsx   # Carte du monde (react-simple-maps)
│   │   │   ├── CountryEvolutionChart.tsx # Évolution par pays
│   │   │   ├── SankeyDiagram.tsx # Diagramme de flux
│   │   │   ├── ChordDiagram.tsx # Diagramme de和弦
│   │   │   └── CountryDetailPanel.tsx # Panel détail pays
│   │   ├── temporal/          # Analyses temporelles
│   │   │   ├── CumulativeChart.tsx # Graphique cumulatif
│   │   │   ├── WeeklyDeltaChart.tsx # Variation hebdomadaire
│   │   │   └── EmergenceTimeline.tsx # Timeline d'émergence
│   │   ├── overview/          # Vue d'ensemble
│   │   │   ├── GlobalScoreCard.tsx # Score global
│   │   │   └── WeeklyDeltaBadge.tsx # Badge variation hebdo
│   │   ├── ai/                # Analyse IA (Gemini)
│   │   │   └── AIAnalysisCenter.tsx # Centre d'analyse IA
│   │   ├── navigation/        # Navigation
│   │   │   └── NavMenu.tsx    # Menu de navigation
│   │   ├── layout/            # Layout
│   │   │   ├── PageLayout.tsx # Layout principal
│   │   │   └── GuidePanel.tsx # Panel guide utilisateur
│   │   └── ui/                # Composants UI réutilisables
│   │       ├── GlassPanel.tsx # Panel effet verre
│   │       └── Card3D.tsx     # Carte 3D
│   └── lib/                   # Logique métier
│       ├── csvParser.ts       # Fetch & parse Google Sheets → Alert[]
│       ├── mockData.ts        # Données de secours offline
│       ├── rasffNotificationMap.ts # Mapping ref RASFF → URLs
│       ├── dataEngine.ts      # Filtres, export CSV
│       ├── statistics.ts      # Calculs statistiques de base
│       ├── advancedStats.ts   # Statistiques avancées
│       ├── temporalEngine.ts  # Analyses temporelles
│       ├── geoEngine.ts       # Calculs géographiques
│       ├── hypothesisEngine.ts# Tests d'hypothèses statistiques
│       └── aiService.ts       # Interface Gemini API
├── scripts/
│   └── enrich-rasff-links.ts  # Script pour enrichir le mapping
├── package.json               # Dépendances et scripts
├── vite.config.ts             # Configuration Vite
└── tsconfig.json              # Configuration TypeScript
```

## Flux de données

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SOURCE DE DONNÉES                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│  Google Sheets (RASFF)                                                       │
│  URL: https://docs.google.com/spreadsheets/d/1OvFp8TLFhLB5BxcK2ZzmvMMWF...  │
│  → Export CSV → fetch()                                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           csvParser.ts                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. fetch() → télécharge le CSV                                             │
│  2. Papa.parse() → convertit en objet Alert[]                                │
│  3. Cache localStorage (7 jours)                                            │
│  4. mapAlertsToRasff() → convertit Alert[] → RasffData[]                   │
│     • Utilise notification_id du sheet si présent                           │
│     • Sinon fallback sur rasffNotificationMap.ts                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           App.tsx                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│  • State: rasffData[], filters, activeSection, loadState                     │
│  • useEffect → load() → fetchAlerts() → mapAlertsToRasff()                  │
│  • filterData(rasffData, filters) → filteredData                            │
│  • calculateStats(filteredData) → stats                                     │
│  • Rendering selon activeSection                                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
            ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
            │ Overview    │ │ Statistical │ │ Predictive  │
            │ Temporal    │ │ Geo         │ │ AI          │
            └─────────────┘ └─────────────┘ └─────────────┘
```

## Fonctionnalités par section

| Section | Description | Composants clés |
|---------|-------------|------------------|
| **Overview** | Vue d'ensemble du dashboard | GlobalScoreCard, TrendChart, NotificationsTable, FilterBar |
| **Temporal** | Analyse temporelle | CumulativeChart, WeeklyDeltaChart, EmergenceTimeline |
| **Geo** | Visualisation géographique | WorldMap, SankeyDiagram, ChordDiagram, CountryEvolutionChart |
| **Statistical** | Statistiques avancées | DistributionChart, CorrelationMatrix, AnomalyDetector, ParetoChart |
| **Predictive** | Tests d'hypothèses et forecast | HypothesisPanel, HypothesisResult, ForecastChart |
| **AI** | Analyse par IA (Gemini) | AIAnalysisCenter |
| **Guide** | Guide utilisateur | GuidePanel |

## Scripts disponibles

```bash
# Installer les dépendances
npm install

# Lancer le serveur de dev (port 3000)
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview

# Vérifier Typescript
npm run lint

# Enrichir le mapping RASFF (script manuel)
npm run enrich:rasff-links
```

## Configuration

### Variables d'environnement

Créer un fichier `.env.local`:
```bash
GEMINI_API_KEY=your_gemini_api_key
```

### Source de données

La source de données est un Google Sheets public. Pour changer la source:
1. Modifier `SHEET_URL` dans `src/lib/csvParser.ts` (ligne 29-30)

## Mapping RASFF

Le fichier `rasffNotificationMap.ts` contient le mapping durci entre:
- **reference** (ex: "2026.2954") → **notification_id** + **URL**

Ce fichier est versionné dans le repo etMis à jour manuellement via:
```bash
npm run enrich:rasff-links
```

## Dépendances principales

| Package | Usage |
|---------|-------|
| React 19 | Framework UI |
| Vite | Build tool |
| Recharts | Graphiques |
| D3 | Visualisations avancées |
| react-simple-maps | Carte du monde |
| papaparse | Parsing CSV |
| @google/generative-ai | IA Gemini |
| motion | Animations |
| Tailwind CSS | Styling |

## Déploiement

Le projet peut être déployé sur n'importe quel hébergement static (Vercel, Netlify, GitHub Pages) après `npm run build`.