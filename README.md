# Vidéo HTML — Démo gratuite de site web

Ce projet a été converti en **HTML/CSS autonome**, sans Remotion obligatoire, pour éviter les conflits Remotion et les problèmes de rendu vidéo pendant le déploiement.

Le résultat est une publicité verticale 9:16 animée de 15 secondes, lisible dans un navigateur et déployable directement sur Vercel.

## Résultat

- Page principale : `index.html`
- Déploiement Vercel : `npm run build` puis publication de `dist/`
- Format visuel : vertical 9:16
- Durée de l'animation : 15 secondes
- Message principal : `Ton Instagram attire. Ton site doit convertir.`

## Pourquoi HTML au lieu de Remotion ?

Tu as indiqué qu'il y avait un gros conflit au niveau de Remotion. Pour régler ça, la vidéo a été convertie en animation HTML/CSS :

- pas besoin de rendu Remotion sur Vercel ;
- pas de gros fichiers binaires à extraire ;
- pas de MP4 dans Git ;
- déploiement Vercel simple ;
- animation visible directement sur téléphone ou ordinateur.

## Déployer sur Vercel

Dans Vercel, garde ces réglages :

```text
Build Command: npm run build
Output Directory: dist
```

Le fichier `vercel.json` configure déjà ces valeurs.

## Prévisualiser localement

Ouvre simplement `index.html` dans un navigateur.

Ou lance :

```bash
npm run build
```

Puis ouvre `dist/index.html`.

## Transformer en MP4

Je ne peux pas envoyer un MP4 directement dans le chat. Pour obtenir un MP4 :

1. Ouvre la page déployée Vercel ou `index.html` localement.
2. Mets la fenêtre en format téléphone si possible.
3. Lance un enregistrement écran pendant 15 secondes.
4. Importe l'enregistrement dans CapCut.
5. Recadre en 9:16 si besoin.

C'est la méthode la plus simple depuis mobile.

## Textes inclus dans l'animation

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
- Bouton : `Envoyez DÉMO`

## Voix off

Le texte de voix off est conservé dans `voiceover.txt`. Tu peux le copier dans CapCut, ElevenLabs ou un outil TTS.
