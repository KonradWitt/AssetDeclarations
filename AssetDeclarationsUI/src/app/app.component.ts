import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Route, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AiContentWarningDialogComponent } from './dialogs/ai-content-warning-dialog/ai-content-warning-dialog.component';
import { Chart } from 'chart.js';
import { AuthService } from './services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { routes } from './app.routes';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { NgTemplateOutlet } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Title } from '@angular/platform-browser';
import { isDevMode } from '@angular/core';
import { DisplayDeviceService } from './services/display-device.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatTabsModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatSidenavModule,
    NgTemplateOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly warning_key = 'ai_content_warning_displayed';

  displayDeviceService = inject(DisplayDeviceService);

  displayedNavLinks = computed(() => {
    return routes.filter((route) => {
      const label = route.data?.['label'];
      const requiresLogin = route.canActivate !== undefined;
      const requiresAdmin = route.data?.['authRole'] === 'ADMIN';

      return (
        label &&
        (!requiresLogin || this.authService.isLoggedIn()) &&
        (!requiresAdmin || this.authService.isAdminLoggedIn())
      );
    });
  });

  isLoggedIn = computed(() => this.authService.isLoggedIn());
  userName = computed(() => this.authService.userName());
  password = signal<string>('');
  isPreviewActive = computed(() => {
    return this.password() === 'preview.1234' || isDevMode();
  });

  constructor(
    private dialogService: MatDialog,
    private authService: AuthService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Zawód Polityk');
    Chart.defaults.backgroundColor = '#007bff';
  }

  ngOnInit(): void {
    if (sessionStorage.getItem(this.warning_key) != 'true') {
      this.dialogService.open(AiContentWarningDialogComponent);
      sessionStorage.setItem(this.warning_key, 'true');
    }
  }

  onLogoutClicked() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  getDrawerToggleContext(drawer: MatDrawer) {
    return { toggle: () => drawer.toggle() };
  }
}
