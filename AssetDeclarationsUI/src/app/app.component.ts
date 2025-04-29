import { Component, computed, OnInit, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AiContentWarningDialogComponent } from './dialogs/ai-content-warning-dialog/ai-content-warning-dialog.component';
import { Chart } from 'chart.js';
import { AuthService } from './services/auth.service';
import { MatIconModule } from '@angular/material/icon';

interface ILink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatTabsModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly warning_key = 'ai_content_warning_displayed';

  private readonly navLinks = [
    { path: '', label: 'Znajdź polityka' },
    {
      path: 'nieruchomosci',
      label: 'Przegląd nieruchomości',
    },
    {
      path: 'partie',
      label: 'Porównanie partii',
    },
    { path: 'edytuj', label: 'Edytuj', requiresAuth: true },
  ];

  title = 'AssetDeclarationsUI';

  displayedNavLinks = computed(() => {
    return this.navLinks.filter(
      (link) => !link.requiresAuth || this.authService.isLoggedIn()
    );
  });

  isLoggedIn = computed(() => this.authService.isLoggedIn());

  constructor(
    private dialogService: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
    Chart.defaults.backgroundColor = '#007bff';
  }

  ngOnInit(): void {
    this.authService.logout();
    if (sessionStorage.getItem(this.warning_key) != 'true') {
      this.dialogService.open(AiContentWarningDialogComponent);
      sessionStorage.setItem(this.warning_key, 'true');
    }
  }

  onLogoutClicked() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
