# Résoudre les conflits GitHub de cette PR

Les captures montraient des conflits sur `.gitignore`, `README.md`, `package.json` et `scripts/build-web.mjs`.

Le bon choix maintenant est de garder la version **MP4 premium 15 secondes** :

- `npm run build` doit générer `out/video-demo-gratuite.mp4` ;
- `scripts/render-video.mjs` est le rendu principal vérifié ;
- `scripts/verify-video.mjs` confirme le format 1080x1920, 30 FPS, 15 secondes et les frames clés ;
- `src/` garde une base Remotion pour prévisualiser/adapter les scènes.

## Choix rapides dans GitHub

| Fichier | Bouton conseillé | Pourquoi |
| --- | --- | --- |
| `.gitignore` | garder la version avec `out/`, `*.mp4`, `dist/` ignorés | Les binaires se recréent localement, on ne les versionne pas. |
| `README.md` | garder la version qui commence par `Vidéo pub premium — démo gratuite site web` | Elle documente le rendu MP4 final. |
| `package.json` | garder la version avec `build`, `verify:video`, `render:remotion` | `npm run build` recrée le MP4 et `verify:video` le contrôle. |
| `scripts/build-web.mjs` | garder la version sans marqueurs de conflit | Le build Vercel reste statique, séparé du rendu MP4 local. |

Après chaque fichier, clique sur **Mark as resolved**, puis sur **Commit merge**.

## Vérification automatique

Après résolution, lance :

```bash
npm run check:conflicts
npm run build
npm run verify:video
```

Ces commandes doivent confirmer qu'il n'y a plus de marqueurs `début de conflit`, `séparateur`, `fin de conflit` et que la vidéo finale existe bien dans `out/video-demo-gratuite.mp4`.
