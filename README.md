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
npm run render
```

Après `npm run prepare-assets`, les 12 PNG requis apparaissent dans `public/generated-assets/`. Après `npm run render`, le MP4 apparaît dans `out/video-demo-gratuite.mp4`.

## Installation

```bash
npm install
```

> Note : l’installation du skill `npx skills add remotion-dev/skills` a été tentée. Si votre registre npm bloque ce paquet, le projet fonctionne en Remotion classique.


## Déploiement Vercel

Sur Vercel, la commande `npm run build` sert uniquement à préparer un site statique dans `dist/`. Elle ne rend pas le MP4, car le rendu Remotion est une tâche de production vidéo à lancer localement ou dans un job séparé.

Si Vercel affiche `Command "npm run build" exited with 1`, redéployez avec cette version : `npm run build` exécute maintenant `scripts/build-web.mjs`, copie `index.html` dans `dist/`, puis termine avec succès.

Pour obtenir la vidéo, utilisez toujours `npm run render` hors du build Vercel.


## Erreur Vercel : branche ou commit introuvable

Si Vercel affiche :

```text
The provided GitHub repository does not contain the requested branch or commit reference. Please ensure the repository is not empty.
```

ce n'est pas une erreur Remotion et ce n'est pas encore une erreur de build. Vercel n'arrive pas à trouver la branche ou le commit GitHub demandé.

À vérifier dans l'ordre :

1. La pull request doit être **mergée** dans la branche que vous déployez, souvent `main`.
2. Dans l'écran Vercel **New Project**, le champ de branche doit pointer vers une branche qui existe vraiment sur GitHub. Si le code est encore dans une branche Codex/PR, sélectionnez cette branche ou mergez-la d'abord dans `main`.
3. Le dépôt GitHub ne doit pas être vide : il doit contenir au minimum `package.json`, `index.html`, `vercel.json`, `scripts/` et `src/`.
4. Si vous venez juste de créer ou merger la branche, retournez en arrière puis ré-importez le projet, ou cliquez sur **Redeploy** après quelques secondes pour laisser GitHub/Vercel se synchroniser.
5. Dans **Build and Output Settings**, gardez la commande de build `npm run build` et l'output directory `dist`, comme défini dans `vercel.json`.

Pour ce projet, Vercel sert uniquement à déployer le site statique. Le MP4 se génère ensuite avec `npm run render`, hors du déploiement Vercel.

## Générer les assets

```bash
npm run prepare-assets
```

Le script crée automatiquement `public/generated-assets/` et génère au moins 12 visuels PNG locaux, sans dépendre d’images externes : fonds premium, mockups abstraits, DM, dashboard, formulaire, CTA, portfolio, light sweep.

## Prévisualiser

```bash
npm run start
```

## Rendre la vidéo en MP4

```bash
npm run render
```

Résultat attendu :

```text
out/video-demo-gratuite.mp4
```


## Récupérer la vidéo

Je ne peux pas intégrer un fichier MP4 directement dans un message de chat. Le rendu doit être récupéré comme fichier de projet :

1. Lancez `npm run render`.
2. Ouvrez le dossier `out/`.
3. Récupérez `out/video-demo-gratuite.mp4` et importez-le dans TikTok, Instagram Reels, CapCut ou votre outil de montage.

Si vous utilisez une interface Codex/GitHub, téléchargez le fichier depuis les artefacts, le workspace, ou après avoir cloné la branche et exécuté la commande de rendu localement.

## Ajouter la voix off

Le texte exact est dans `src/voiceover.txt`.

Méthode simple :

1. Rendre la vidéo avec `npm run render`.
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
