# Suivi du projet Syndic — État final

## Backend — Migrations (11/11) ✅
- [x] Résidences, Immeubles, Propriétaires, Logements, Occupants
- [x] Cotisations, Paiements, Dépenses, Documents (polymorphe)
- [x] Users (+ role), Residence_user (pivot)

## Backend — Modèles Eloquent (10/10) ✅
- [x] Toutes les relations : hasMany, belongsTo, belongsToMany, morphTo/morphMany

## Backend — Contrôleurs API (10/10) ✅
- [x] 9 contrôleurs CRUD complets
- [x] AuthController (register, login, logout, me)
- [x] RapportController (export PDF financier)

## Backend — Sécurité ✅
- [x] Sanctum (authentification par token)
- [x] Middleware CheckRole (admin/syndic/resident)
- [x] Routes protégées par rôle sur les 9 modules (lecture ouverte, écriture admin/syndic)

## Frontend — Setup & Auth ✅
- [x] Angular Material
- [x] AuthService, HttpInterceptor, AuthGuard
- [x] Page Login

## Frontend — Navigation ✅
- [x] Layout avec sidebar (10 liens)
- [x] Dashboard avec KPIs réels + bouton export PDF

## Frontend — Pages CRUD (9/9) ✅
- [x] Résidences, Immeubles, Propriétaires, Logements
- [x] Occupants, Cotisations, Paiements, Dépenses, Documents

## Frontend — Qualité UX ✅
- [x] Boutons créer/modifier/supprimer masqués selon le rôle
- [x] Menus déroulants pour toutes les clés étrangères (Résidence, Immeuble, Logement, Propriétaire, Cotisation)
- [x] Notifications d'erreur visibles (MatSnackBar)

## Fonctionnalité métier ✅
- [x] Mise à jour automatique du statut de cotisation lors d'un paiement
- [x] Export PDF du rapport financier (KPIs + solde)

## Documentation ✅
- [x] README.md (installation, architecture, stack, rôles)
- [x] PROGRESS.md (ce fichier)

## Non fait / évolutions futures possibles
- [ ] Navigation par relation (clic résidence → immeubles filtrés)
- [ ] Export Excel
- [ ] Génération automatique des cotisations (tâche planifiée / cron)
- [ ] Upload réel de fichiers pour documents (actuellement chemin texte)
- [ ] Menu déroulant pour Document (documentable_id dépend du type choisi)
- [ ] Notifications automatiques pour cotisations en retard
- [ ] Tests automatisés (PHPUnit / Jasmine)

## Bugs résolus durant le développement (retour d'expérience)
- Permissions Docker (fichiers créés en root, non éditables)
- Ordre des migrations (timestamps identiques → tri alphabétique incorrect)
- $fillable manquant sur plusieurs modèles (protection mass assignment Eloquent)
- Route api.php non chargée (bootstrap/app.php, Laravel 11+)
- AuthenticationException mal gérée sans header Accept: application/json
- zone.js manquant (Angular ne démarrait pas du tout)
- NG0303 : CommonModule manquant dans un composant standalone (*ngFor cassé)
- window.confirm() bloqué silencieusement par le navigateur
- Erreur 422 due à des IDs de clé étrangère invalides (résolu par menus déroulants)

## Stack finale
Laravel 11 (PHP 8.4) · Angular 20 · PostgreSQL 16 · Docker Compose · Angular Material · Sanctum · DomPDF
