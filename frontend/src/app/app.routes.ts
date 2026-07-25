import { Paiements } from './pages/paiements/paiements';
import { Cotisations } from './pages/cotisations/cotisations';
import { Occupants } from './pages/occupants/occupants';
import { Logements } from './pages/logements/logements';
import { Proprietaires } from './pages/proprietaires/proprietaires';
import { Immeubles } from './pages/immeubles/immeubles';
import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Residences } from './pages/residences/residences';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'residences', component: Residences },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'immeubles', component: Immeubles },
  { path: 'proprietaires', component: Proprietaires },
  { path: 'logements', component: Logements },
  { path: 'occupants', component: Occupants },
  { path: 'cotisations', component: Cotisations },
  { path: 'paiements', component: Paiements },
];
