import { Component, input, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { AssetDeclaration } from '../../model/assetDeclaration.interface';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-declarations-card',
  imports: [CardComponent, NgFor, DatePipe],
  templateUrl: './declarations-card.component.html',
  styleUrl: './declarations-card.component.scss',
})
export class DeclarationsCardComponent {
  declarations = input<AssetDeclaration[]>();
}
