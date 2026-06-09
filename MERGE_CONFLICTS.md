# Résoudre les conflits GitHub de cette PR

Les captures montrent 4 fichiers en conflit : `.gitignore`, `README.md`, `package.json` et `scripts/build-web.mjs`.

Le bon choix est de garder la version **HTML/CSS 3D autonome**, pas l'ancienne version Remotion. Remotion créait les conflits et les problèmes de build.

## Choix rapides dans l'interface GitHub

| Fichier | Bouton conseillé | Pourquoi |
| --- | --- | --- |
| `.gitignore` | `Accept current change`, puis vérifie le contenu ci-dessous | Garde les règles pour `public/references/` et les exports locaux. |
| `README.md` | `Accept current change` | Garde la documentation HTML/CSS 3D 14 secondes avec les 30 photos. |
| `package.json` | `Accept current change` | Garde le build simple Vercel sans dépendances Remotion. |
| `scripts/build-web.mjs` | `Accept current change` | Garde le message HTML et évite le retour à `npm run render`. |

Après chaque fichier, clique sur **Mark as resolved**, puis sur **Commit merge**.

## Contenu final attendu

### `.gitignore`

```gitignore
node_modules/
package-lock.json
dist/
out/
*.mp4
public/references/*
!public/references/.gitkeep
```

### `package.json`

```json
{
  "name": "video-demo-gratuite-html",
  "version": "1.0.0",
  "private": true,
  "description": "Vidéo publicitaire verticale premium convertie en HTML/CSS autonome.",
  "scripts": {
    "build": "node scripts/build-web.mjs",
    "start": "node scripts/build-web.mjs"
  }
}
```

### `scripts/build-web.mjs`

La dernière ligne doit être :

```js
console.log('Ouvrez dist/index.html pour voir la vidéo HTML.');
```

Il ne faut pas remettre :

```js
console.log('Pour rendre la vidéo localement, utilisez: npm run render');
```

### `README.md`

Le README final doit commencer par :

```md
# Pub verticale premium — storyboard HTML 3D 14 secondes
```

Il ne doit pas revenir à :

```md
# Vidéo Remotion — Démo gratuite de site web
```

## Si GitHub mobile est trop pénible

Le plus simple est de faire les conflits depuis un ordinateur :

1. Ouvre la PR GitHub.
2. Clique **Resolve conflicts**.
3. Pour les 4 fichiers, garde la version HTML/CSS 3D indiquée ci-dessus.
4. Clique **Mark as resolved** pour chaque fichier.
5. Clique **Commit merge**.
