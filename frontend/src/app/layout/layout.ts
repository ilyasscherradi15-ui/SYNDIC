import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
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
export class Layout implements OnInit {
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

  isMobile = false;
  sidenavMode: 'side' | 'over' = 'side';
  sidenavOpened = true;

  constructor(public authService: AuthService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      this.isMobile = result.matches;
      this.sidenavMode = result.matches ? 'over' : 'side';
      this.sidenavOpened = !result.matches;
    });
  }

  toggleSidenav(sidenav: MatSidenav): void {
    sidenav.toggle();
  }

  closeSidenavOnMobile(sidenav: MatSidenav): void {
    if (this.isMobile) {
      sidenav.close();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
