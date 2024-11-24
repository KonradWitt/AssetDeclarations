import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

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
export class AppComponent {
  title = 'AssetDeclarationsUI';
  links: ILink[] = [
    { path: '', label: 'Home' },
    { path: 'rankings', label: 'Rankingi' },
    { path: 'edit', label: 'Edytuj' },
  ];

  activeLink = signal<ILink>(this.links[0]);
}
