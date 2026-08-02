# Suivi du projet Syndic

## Backend — Migrations (11/11) ✅
- [x] Résidences
- [x] Immeubles
- [x] Propriétaires
- [x] Logements
- [x] Occupants
- [x] Cotisations
- [x] Paiements
- [x] Dépenses
- [x] Documents (relation polymorphe)
- [x] Users (+ role)
- [x] Residence_user (pivot)

## Backend — Modèles Eloquent (10/10) ✅
- [x] Residence, Immeuble, Proprietaire, Logement, Occupant
- [x] Cotisation, Paiement, Depense, Document, User
- [x] Toutes les relations (hasMany, belongsTo, belongsToMany, morphTo/morphMany)

## Backend — Contrôleurs API (9/9) ✅
- [x] ResidenceController
- [x] ImmeubleController
- [x] ProprietaireController
- [x] LogementController
- [x] OccupantController
- [x] CotisationController
- [x] PaiementController (logique métier auto : mise à jour du statut cotisation)
- [x] DepenseController
- [x] DocumentController

## Backend — Authentification & Sécurité ✅
- [x] Sanctum (register, login, logout, me)
- [x] Middleware CheckRole (admin/syndic/resident)
- [x] Routes protégées par rôle sur les 9 modules

## Frontend — Setup & Auth ✅
- [x] Angular Material
- [x] AuthService (login, register, logout, currentUser signal)
- [x] HttpInterceptor (ajout automatique du token)
- [x] AuthGuard (protection des routes)
- [x] Page Login

## Frontend — Navigation ✅
- [x] Layout avec sidebar (10 liens)
- [x] Dashboard avec KPIs réels (résidences, logements, cotisations, impayés, dépenses)

## Frontend — Pages CRUD (9/9) ✅
- [x] Résidences (service + liste + formulaire dialog)
- [x] Immeubles
- [x] Propriétaires
- [x] Logements (avec menus déroulants type/statut)
- [x] Occupants
- [x] Cotisations (avec menu déroulant type)
- [x] Paiements
- [x] Dépenses (avec menu déroulant catégorie)
- [x] Documents

## Frontend — Sécurité UI ✅
- [x] Boutons créer/modifier/supprimer masqués selon le rôle (canManage())

## Documentation ✅
- [x] README.md
- [x] PROGRESS.md

## Non fait / évolutions futures
- [ ] Navigation par relation (clic résidence → immeubles filtrés)
- [ ] Export PDF/Excel des rapports
- [ ] Génération automatique des cotisations (cron)
- [ ] Upload réel de fichiers pour documents
- [ ] Menus déroulants pour les clés étrangères (actuellement saisie d'ID manuelle)
- [ ] Notifications impayés

## Bugs résolus (pour référence)
- Permissions Docker (fichiers appartenant à root)
- Ordre des migrations (timestamps identiques)
- $fillable manquant sur plusieurs modèles (mass assignment)
- Route api.php non chargée (bootstrap/app.php)
- AuthenticationException / header Accept manquant
- zone.js manquant (Angular ne démarrait pas)
- NG0303 CommonModule manquant (*ngFor cassé)
- window.confirm() bloqué par le navigateur
