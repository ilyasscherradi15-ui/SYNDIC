# Syndic de Résidence — Application de gestion

Application web de gestion administrative et financière de résidences immobilières : résidences, immeubles, logements, propriétaires, cotisations, paiements et dépenses.

Projet réalisé dans le cadre d'un projet individuel — ENSA Tétouan, 3ème année génie informatique.

## Stack technique

| Couche | Technologie |
|---|---|
| Backend | Laravel 11 (PHP 8.4) |
| Frontend | Angular 20 (standalone components) + Angular Material |
| Base de données | PostgreSQL 16 |
| Authentification | Laravel Sanctum (token-based) |
| Conteneurisation | Docker & Docker Compose |

## Architecture
### Backend (Laravel)

- 11 tables : residences, immeubles, logements, proprietaires, occupants, cotisations, paiements, depenses, documents, users, residence_user
- 9 contrôleurs API REST (CRUD complet)
- Authentification par token (Sanctum)
- Autorisation par rôle (middleware personnalisé) : admin, syndic, resident
- Relations Eloquent : hasMany, belongsTo, belongsToMany, morphTo/morphMany (documents polymorphes)

### Frontend (Angular)

- Composants standalone (Angular 17+)
- Angular Material (tableaux, formulaires, dialogs, navigation)
- Architecture : services (appels API) / pages (composants visuels) / guards (protection des routes)
- Authentification avec intercepteur HTTP (ajout automatique du token)
- Interface adaptée au rôle de l'utilisateur connecté

## Rôles et permissions

| Rôle | Permissions |
|---|---|
| Admin | Accès complet à toutes les ressources |
| Syndic | Accès complet à toutes les ressources |
| Résident | Lecture seule |

## Installation et lancement

### Prérequis

- Docker et Docker Compose

### Démarrage

```bash
git clone <url-du-repo>
cd syndic-app
docker compose up -d --build
```

### Migrations et données de test

```bash
docker exec -it syndic_backend php artisan migrate
```

### Accès

| Service | URL |
|---|---|
| Frontend | http://localhost:4200 |
| Backend API | http://localhost:8000/api |
| pgAdmin | http://localhost:5050 |

### Compte de test
## Modules fonctionnels

- [x] Authentification (inscription, connexion, déconnexion)
- [x] Gestion des résidences
- [x] Gestion des immeubles
- [x] Gestion des logements (appartement, villa, duplex, bungalow)
- [x] Gestion des propriétaires
- [x] Gestion des occupants
- [x] Gestion des cotisations (mensuelle, trimestrielle, annuelle, exceptionnelle)
- [x] Gestion des paiements (mise à jour automatique du statut de cotisation)
- [x] Gestion des dépenses
- [x] Gestion des documents (relation polymorphe)
- [x] Dashboard avec indicateurs (KPIs)
- [x] Sécurité par rôle (backend + frontend)

## Évolutions possibles

- Export de rapports financiers (PDF/Excel)
- Génération automatique des cotisations mensuelles (tâche planifiée)
- Upload réel de fichiers pour les documents
- Notifications pour les cotisations en retard
- Navigation contextuelle entre entités liées

## Structure de la base de données
