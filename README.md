# Vidéo Remotion — Démo gratuite de site web

Projet Remotion complet pour générer une publicité verticale premium de 15 secondes, prête pour TikTok / Instagram Reels.

## Format

- Composition Remotion : `DemoVideo`
- Résolution : `1080x1920`
- FPS : `30`
- Durée : `15 secondes` / `450 frames`
- Rendu final : `out/video-demo-gratuite.mp4`


## Important : fichiers binaires

Les PNG générés et le MP4 final ne sont pas versionnés dans Git, car certaines interfaces de chat ou d'extraction affichent `les fichiers binaires ne sont pas pris en charge`.

C'est normal : le dépôt reste léger et lisible en texte. Pour recréer les fichiers binaires localement :

```bash
npm run prepare-assets
npm run build
```

Après `npm run prepare-assets`, les 12 PNG requis apparaissent dans `public/generated-assets/`. Après `npm run build`, le MP4 apparaît dans `out/video-demo-gratuite.mp4`.

## Installation

```bash
npm install
```

> Note : l’installation du skill `npx skills add remotion-dev/skills` a été tentée. Si votre registre npm bloque ce paquet, le projet fonctionne en Remotion classique.

## Générer les assets

```bash
npm run prepare-assets
```

Le script crée automatiquement `public/generated-assets/` et génère au moins 12 visuels PNG locaux, sans dépendre d’images externes : fonds premium, mockups abstraits, DM, dashboard, formulaire, CTA, portfolio, light sweep.

## Prévisualiser

```bash
npm run start
```

## Rendre la vidéo

```bash
npm run build
```

Résultat attendu :

```text
out/video-demo-gratuite.mp4
```


## Récupérer la vidéo

Je ne peux pas intégrer un fichier MP4 directement dans un message de chat. Le rendu doit être récupéré comme fichier de projet :

1. Lancez `npm run build`.
2. Ouvrez le dossier `out/`.
3. Récupérez `out/video-demo-gratuite.mp4` et importez-le dans TikTok, Instagram Reels, CapCut ou votre outil de montage.

Si vous utilisez une interface Codex/GitHub, téléchargez le fichier depuis les artefacts, le workspace, ou après avoir cloné la branche et exécuté la commande de rendu localement.

## Ajouter la voix off

Le texte exact est dans `src/voiceover.txt`.

Méthode simple :

1. Rendre la vidéo avec `npm run build`.
2. Copier le contenu de `src/voiceover.txt` dans CapCut, ElevenLabs, Narakeet, Balabolka, ou un outil TTS gratuit.
3. Importer l’audio généré dans CapCut ou votre outil de montage.
4. Aligner la voix off sur les 15 secondes.

Aucune clé API n’est nécessaire pour rendre la vidéo muette.

## Modifier les textes

Les scènes et textes principaux sont dans `src/Video.tsx` :

- `Ton Instagram attire.`
- `Ton site doit convertir.`
- `Les DM font perdre du temps.`
- `Une vraie vitrine change tout.`
- `Gain de temps.`
- `Demandes plus claires.`
- `Le client remplit.`
- `Vous recevez.`
- `Sans site : confusion.`
- `Avec site : clarté.`
- `Démo gratuite.`
- `Venez DM.`

## Remplacer ou ajouter des images

- Assets générés : `public/generated-assets/`
- Images de référence possibles : `public/references/`

Le composant `GeneratedImage` affiche les PNG générés. Les UI principales restent codées en React/CSS/SVG pour garder un rendu cohérent et premium même sans Internet.

## Structure principale

```text
src/Root.tsx
src/Video.tsx
src/styles.css
src/voiceover.txt
src/components/
scripts/prepare-assets.ts
public/generated-assets/
out/
```
