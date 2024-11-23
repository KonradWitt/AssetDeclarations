import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

interface ILink {
  path: string;
  label: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatTabsModule, MatToolbarModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'AssetDeclarationsUI';
  links: ILink[] = [
    { path: '', label: 'Home' },
    { path: 'rankings', label: 'Rankingi' },
  ];

  activeLink = signal<ILink>(this.links[0]);
}
