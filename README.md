# Pub verticale premium — storyboard HTML 3D 14 secondes

Ce projet fournit une publicité verticale 9:16 en **HTML/CSS 3D autonome**, pensée comme deux clips de 7 secondes :

- Clip 1 : hook + problème, de 0s à 7s.
- Clip 2 : solution + bénéfices + CTA, de 7s à 14s.

Le rendu ne dépend pas de Remotion pour éviter les conflits de merge et les problèmes de build Vercel. Il reste compatible avec un export MP4 via enregistrement écran ou outil de capture navigateur.

## Utiliser les 30 photos

Ajoute tes 30 photos de référence ici :

```text
public/references/photo-01.jpg
public/references/photo-02.jpg
...
public/references/photo-30.jpg
```

Les images ne sont pas commit dans Git pour éviter les problèmes de fichiers binaires. Le dossier contient seulement `.gitkeep`.

La page utilise les photos comme storyboard visuel : hook, chaos DM, transformation, dashboard, formulaire et CTA final. Si une photo manque, un fallback premium champagne/bleu nuit s'affiche automatiquement.

## Déployer sur Vercel

Dans Vercel, garde :

```text
Build Command: npm run build
Output Directory: dist
```

`vercel.json` contient déjà cette configuration.

## Prévisualiser

```bash
npm run build
```

Puis ouvre :

```text
dist/index.html
```

Tu peux aussi ouvrir directement `index.html`.

## Ajouter les textes dans CapCut

Le HTML laisse des zones visuelles calmes en haut et en bas pour ajouter les textes dans CapCut. Les timings exacts sont dans `capcut-texts.txt`.

Style conseillé :

- police moderne, très lisible ;
- texte ivoire ;
- mots importants en champagne ;
- blur-in, fade-up, zoom léger ;
- jamais plus de 5 à 7 mots à l'écran.

## Voix off

La voix off complète et les voix off par clip sont dans `voiceover.txt`.

## Transformer en MP4

Je ne peux pas envoyer directement un MP4 dans le chat. Pour obtenir un MP4 :

1. Déploie sur Vercel ou ouvre `index.html` localement.
2. Ouvre la page en plein écran sur mobile.
3. Enregistre l'écran pendant 14-15 secondes.
4. Importe dans CapCut.
5. Ajoute les textes depuis `capcut-texts.txt` et la voix off depuis `voiceover.txt`.

## Effets inclus

- profondeur 3D CSS ;
- grille holographique ;
- light sweep champagne ;
- téléphone mockup 3D ;
- dashboard 3D ;
- bulles DM abstraites sans faux texte ;
- transformation avant/après ;
- formulaire premium ;
- CTA final stable.


## Résoudre les conflits GitHub

Si GitHub affiche des conflits avec l'ancienne version Remotion, garde la version **HTML/CSS 3D autonome**. Le détail exact est dans `MERGE_CONFLICTS.md`.

Résumé rapide :

- `.gitignore` : garder les règles `dist/`, `out/`, `*.mp4`, `public/references/*` et `!public/references/.gitkeep` ;
- `README.md` : garder le README qui commence par `Pub verticale premium — storyboard HTML 3D 14 secondes` ;
- `package.json` : garder seulement les scripts `build` et `start` avec `node scripts/build-web.mjs` ;
- `scripts/build-web.mjs` : garder le message `Ouvrez dist/index.html pour voir la vidéo HTML.`.
