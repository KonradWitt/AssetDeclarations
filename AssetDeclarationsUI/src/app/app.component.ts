import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AiContentWarningDialogComponent } from './dialogs/ai-content-warning-dialog/ai-content-warning-dialog.component';
import { Chart } from 'chart.js';

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
  title = 'AssetDeclarationsUI';

  navLinks = [
    { path: '', label: 'Znajdź polityka' },
    { path: 'nieruchomosci', label: 'Przegląd nieruchomości' },
    { path: 'edytuj', label: 'Edytuj' },
  ];

  constructor(private dialogService: MatDialog) {
    Chart.defaults.backgroundColor = '#007bff';
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('ai-content-warning-displayed') != 'true') {
      this.dialogService.open(AiContentWarningDialogComponent);
      sessionStorage.setItem('ai-content-warning-displayed', 'true');
    }
  }
}
