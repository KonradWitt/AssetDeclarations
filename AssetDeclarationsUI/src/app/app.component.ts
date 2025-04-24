import { Component, computed, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AiContentWarningDialogComponent } from './dialogs/ai-content-warning-dialog/ai-content-warning-dialog.component';
import { Chart } from 'chart.js';
import { AuthService } from './services/auth.service';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly warning_key = 'ai_content_warning_displayed';

  private readonly navLinks = [
    { path: '', label: 'Znajdź polityka', requiresAuth: false },
    {
      path: 'nieruchomosci',
      label: 'Przegląd nieruchomości',
      requiresAuth: false,
    },
    { path: 'edytuj', label: 'Edytuj', requiresAuth: true },
    { path: 'login', label: 'Login', requiresAuth: false },
  ];

  title = 'AssetDeclarationsUI';

  displayedNavLinks = computed(() => {
    return this.navLinks.filter(
      (link) => !link.requiresAuth || this.authService.isLoggedIn()
    );
  });
  
  constructor(
    private dialogService: MatDialog,
    private authService: AuthService
  ) {
    Chart.defaults.backgroundColor = '#007bff';
  }

  ngOnInit(): void {
    if (sessionStorage.getItem(this.warning_key) != 'true') {
      this.dialogService.open(AiContentWarningDialogComponent);
      sessionStorage.setItem(this.warning_key, 'true');
    }
  }
}
