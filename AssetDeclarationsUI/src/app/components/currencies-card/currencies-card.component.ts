import { Component, Input } from '@angular/core';
import { AssetDeclaration } from '../../model/assetDeclaration.type';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-currencies-card',
  imports: [MatListModule, MatCardModule],
  templateUrl: './currencies-card.component.html',
  styleUrl: './currencies-card.component.scss',
})
export class CurrenciesCardComponent {
  @Input() assetDeclaration: AssetDeclaration | undefined;
}
