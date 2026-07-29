import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/residences', label: 'Résidences', icon: 'apartment' },
    { path: '/immeubles', label: 'Immeubles', icon: 'domain' },
    { path: '/logements', label: 'Logements', icon: 'home' },
    { path: '/proprietaires', label: 'Propriétaires', icon: 'person' },
    { path: '/occupants', label: 'Occupants', icon: 'people' },
    { path: '/cotisations', label: 'Cotisations', icon: 'payments' },
    { path: '/paiements', label: 'Paiements', icon: 'receipt_long' },
    { path: '/depenses', label: 'Dépenses', icon: 'shopping_cart' },
    { path: '/documents', label: 'Documents', icon: 'description' },
  ];

  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
