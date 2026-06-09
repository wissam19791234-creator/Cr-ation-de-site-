# Vidéo pub premium — démo gratuite site web

Projet corrigé pour générer un MP4 vertical clair, lisible et compréhensible sans le son.

## Rendu final

```bash
npm run build
```

Résultat :

```text
out/video-demo-gratuite.mp4
```

Le build utilise un fallback FFmpeg local : il génère 450 frames en 1080x1920 à 30 FPS, puis encode le MP4 H.264.

## Storytelling 15 secondes

- 0.0s à 1.8s : `Ton Instagram attire.` / `Ton site doit convertir.`
- 1.8s à 3.8s : `Les DM font perdre du temps.`
- 3.8s à 5.8s : `Une vraie vitrine change tout.`
- 5.8s à 7.8s : `Gain de temps.` / `Demandes plus claires.`
- 7.8s à 10.0s : `Le client remplit.` / `Vous recevez.`
- 10.0s à 12.3s : `Sans site : confusion.` / `Avec site : clarté.`
- 12.3s à 15.0s : `Démo gratuite.` / `Venez DM.` / `Envoyez DÉMO`

## Modifier les textes

Les textes visibles se modifient dans :

```text
scripts/render-video.mjs
src/Video.tsx
src/components/SceneText.tsx
```

## Modifier les couleurs

Palette principale dans :

```text
scripts/render-video.mjs
src/components/SceneText.tsx
```

Couleurs : `#07080D`, `#0E172A`, `#121A33`, `#FFF8ED`, `#D8AD5E`, `#EADCC8`, `#D8CCFF`, `#83C6FF`.

## Voix off

La voix off est dans `voiceover.txt`.
