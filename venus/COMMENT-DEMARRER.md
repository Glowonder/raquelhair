# Vénus Hair — Guide de démarrage

Ce site a 3 pages publiques (accueil, catalogue, contact) + un panneau d'administration (`/admin`) où vous pourrez ajouter des produits et des photos sans toucher au code, une fois qu'il sera connecté.

---

## A) Voir le site tout de suite (2 minutes, aucun compte)

C'est la manière la plus rapide de voir à quoi ressemble le site. **Attention : cette méthode ne permet pas d'utiliser le panneau admin** (il faut la méthode B pour ça) — mais elle suffit pour montrer le rendu à votre amie aujourd'hui.

1. Allez sur **[app.netlify.com/drop](https://app.netlify.com/drop)**
2. Glissez-déposez le dossier complet `venus-hair` (celui que je vous ai donné) sur la page
3. Netlify génère une adresse gratuite du type `nom-au-hasard.netlify.app` — cliquez dessus, le site est en ligne et visible par tout le monde avec ce lien
4. Pour changer les couleurs, textes ou photos, il faudra modifier les fichiers et re-glisser le dossier à chaque fois (pas pratique à long terme — voir méthode B pour un vrai panneau admin)

---

## B) Mettre en place le panneau admin (une fois, ~20-30 min)

Ceci vous permettra ensuite d'ajouter produits et photos depuis un simple formulaire, à l'infini, sans aide extérieure. Trois comptes gratuits sont nécessaires : **GitHub** et **Netlify**.

### Étape 1 — Créer un compte GitHub
Allez sur [github.com/signup](https://github.com/signup) et créez un compte gratuit.

### Étape 2 — Mettre le code du site sur GitHub
1. Sur GitHub, cliquez sur **"New repository"** (nouveau dépôt), nommez-le par exemple `venus-hair`, laissez-le public ou privé, cliquez **Create repository**
2. Sur la page qui s'affiche, utilisez le bouton **"uploading an existing file"** (téléverser des fichiers existants)
3. Glissez-déposez TOUS les fichiers et dossiers du site (`index.html`, `catalogue.html`, `contact.html`, `styles.css`, `products.js`, les dossiers `data/`, `admin/`, `images/`) puis cliquez **Commit changes**

### Étape 3 — Connecter GitHub au fichier admin/config.yml
1. Toujours sur GitHub, ouvrez le fichier `admin/config.yml`, cliquez sur le crayon (modifier)
2. Remplacez la ligne `repo: VOTRE-PSEUDO-GITHUB/NOM-DU-DEPOT` par votre vrai chemin, par exemple `repo: marie123/venus-hair`
3. Cliquez **Commit changes**

### Étape 4 — Déployer le site sur Netlify depuis GitHub
1. Allez sur [app.netlify.com](https://app.netlify.com) et créez un compte gratuit (vous pouvez vous inscrire directement avec votre compte GitHub, c'est plus rapide)
2. Cliquez **"Add new site" > "Import an existing project"**
3. Choisissez **GitHub**, autorisez l'accès, puis sélectionnez le dépôt `venus-hair`
4. Laissez les réglages par défaut (pas de commande de build nécessaire) et cliquez **Deploy**
5. Netlify vous donne une adresse du type `venus-hair-1234.netlify.app` — c'est votre site, en ligne, et il se mettra à jour automatiquement à chaque modification

### Étape 5 — Autoriser la connexion au panneau admin (OAuth GitHub)
1. Sur GitHub, allez dans **Settings > Developer settings > OAuth Apps > New OAuth App**
2. Remplissez :
   - **Application name** : Vénus Hair Admin
   - **Homepage URL** : votre adresse Netlify (ex: `https://venus-hair-1234.netlify.app`)
   - **Authorization callback URL** : `https://api.netlify.com/auth/done`
3. Cliquez **Register application**, puis **Generate a new client secret** — copiez le **Client ID** et le **Client Secret**
4. Sur Netlify, allez dans **Site settings > Access control > OAuth**, cliquez **Install provider**, choisissez **GitHub**, collez le Client ID et le Client Secret

### Étape 6 — Utiliser le panneau admin
Allez sur `https://votre-site.netlify.app/admin`, cliquez **Login with GitHub**, connectez-vous avec le compte GitHub créé à l'étape 1. Vous arrivez sur un formulaire où vous pouvez :
- Ajouter/modifier/supprimer des produits
- Uploader une vraie photo pour chaque produit (glisser-déposer une image)
- Coller le lien de paiement Stripe une fois créé

Chaque sauvegarde republie automatiquement le site en 1-2 minutes.

---

## Activer le paiement (Stripe, gratuit)

1. Créez un compte sur **[dashboard.stripe.com](https://dashboard.stripe.com/register)** (gratuit, aucun abonnement — juste une petite commission par vente, environ 1,5% + 0,25€ en France)
2. Dans Stripe, allez dans **Paiements > Liens de paiement**, créez-en un par produit (nom + prix)
3. Copiez l'URL générée (`https://buy.stripe.com/...`) et collez-la dans le champ "Lien de paiement Stripe" du produit, via le panneau admin (ou directement dans `data/products.json`)
4. Tant que ce champ est vide, le bouton "Acheter" affiche un message d'attente au lieu de planter

**Limite à connaître** : chaque produit s'achète séparément (pas de panier multi-articles) — c'est la solution gratuite la plus simple. Un vrai panier nécessiterait un petit serveur, une évolution possible plus tard.

---

## Ce qui manque encore

- Nom de domaine personnalisé (ex: `venushair.fr`, ~10-15€/an chez OVH ou Namecheap, à connecter dans Netlify une fois acheté)
- Pages CGV / politique de confidentialité / livraison — obligatoires légalement en France, je peux les rédiger sur demande
- Logo graphique (actuellement le nom en texte stylisé)
- Vraies photos produits (via le panneau admin une fois en place)
