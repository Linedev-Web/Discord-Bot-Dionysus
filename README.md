# Dionysus - Bot Discord.js v14

Dionysus est un bot Discord polyvalent utilisant `discord.js` v14 et `Prisma` pour la gestion de la base de données.

## 🚀 Installation et Lancement

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Configuration de l'environnement :**
   Créez un fichier `.env` à la racine du projet avec le contenu suivant :
   ```env
   TOKEN=VOTRE_TOKEN_DISCORD
   DATABASE_URL="file:./dev.db"
   ```

4. **Configuration de l'Onboarding :**
   Ajoutez les rôles suivants dans votre fichier `.env` pour activer le système d'onboarding :
   ```env
   # Roles Onboarding
   ROLE_SOURCE_SITE=ID_ROLE_SITE
   ROLE_SOURCE_SOCIALS=ID_ROLE_RESEAUX

   ROLE_THEME_RAINBOW=ID_ROLE_RAINBOW
   ROLE_THEME_ZODPRESS=ID_ROLE_ZODPRESS
   ROLE_THEME_DISCUSSION=ID_ROLE_DISCUSSION

   # Rules Confirmation
   ROLE_MEMBER=ID_ROLE_MEMBRE
   ```

5. **Initialisation de la base de données (Prisma) :**
   Le bot utilise SQLite par défaut. Pour initialiser la base de données et générer le client Prisma :
   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. **Lancer le bot :**
   ```bash
   node index.js
   ```

## 🚀 Déploiement des Commandes Slash

Si vous ajoutez de nouvelles commandes ou si elles n'apparaissent pas sur Discord, utilisez :
```bash
npm run deploy
# ou avec pnpm
pnpm run deploy
```

**Note :** N'utilisez pas `pnpm deploy` (sans `run`) car c'est une commande pnpm réservée aux workspaces.

Une fois le déploiement terminé, vous pouvez relancer le bot normalement avec `npm run dev`.

## 🛠️ Configuration de Prisma

Le projet utilise **Prisma v5**. Le schéma de la base de données se trouve dans `prisma/schema.prisma`. 
Le client est généré automatiquement dans `node_modules/@prisma/client`.

En cas de modification du schéma :
1. Modifiez `prisma/schema.prisma`.
2. Lancez `npx prisma db push` pour mettre à jour la base de données.

## 📋 Commandes disponibles

### ⚙️ Configuration
- `/set-welcome` : Configure le système de bienvenue sur le serveur.

### 🛡️ Modération
- `/ban` : Bannir un membre du serveur.
- `/kick` : Expulser un membre du serveur.
- `/timeout` : Mettre un membre en sourdine temporaire.
- `/unban` : Débannir un membre.
- `/untimeout` : Retirer la sourdine d'un membre.

### ℹ️ Général
- `/themes` : Modifier vos préférences d'affichage des salons.
- `/ping` : Affiche la latence du bot.
- `/help` : Affiche la liste des commandes.
- `/embed` : Créer un message embed personnalisé.
- `/server-info` : Affiche les informations du serveur.
- `/user-info` : Affiche les informations d'un utilisateur.

### 👑 Owner
- `/eval` : Évalue du code JavaScript (réservé au propriétaire du bot).

## 📂 Structure du Projet

- `src/commands/` : Contient toutes les commandes Slash classées par catégories.
- `src/events/` : Contient les gestionnaires d'événements (client, guildMember, interaction).
- `src/utils/database/` : Gère la logique liée à la base de données Prisma.
- `src/utils/handlers/` : Chargeurs automatiques pour les commandes et événements.
- `index.js` : Point d'entrée du bot.

## 🔄 Mise à jour du code

Les corrections suivantes ont été apportées :
- Rétrogradation de Prisma de v7 à v5 pour une meilleure compatibilité avec le code actuel.
- Correction des imports Prisma dans `src/utils/database/structure.js`.
- Configuration automatique de la source de données via `.env`.
