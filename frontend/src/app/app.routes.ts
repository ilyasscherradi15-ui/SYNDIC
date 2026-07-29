import { authGuard } from './guards/auth-guard';
import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './layout/layout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Residences } from './pages/residences/residences';
import { Immeubles } from './pages/immeubles/immeubles';
import { Logements } from './pages/logements/logements';
import { Proprietaires } from './pages/proprietaires/proprietaires';
import { Occupants } from './pages/occupants/occupants';
import { Cotisations } from './pages/cotisations/cotisations';
import { Paiements } from './pages/paiements/paiements';
import { Depenses } from './pages/depenses/depenses';
import { Documents } from './pages/documents/documents';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'residences', component: Residences },
      { path: 'immeubles', component: Immeubles },
      { path: 'logements', component: Logements },
      { path: 'proprietaires', component: Proprietaires },
      { path: 'occupants', component: Occupants },
      { path: 'cotisations', component: Cotisations },
      { path: 'paiements', component: Paiements },
      { path: 'depenses', component: Depenses },
      { path: 'documents', component: Documents },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

