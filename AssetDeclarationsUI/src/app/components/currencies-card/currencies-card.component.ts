import {
  Component,
  computed,
  input,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { AssetDeclaration } from '../../model/assetDeclaration.type';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CashPosition } from '../../model/cashPosition.type';
import { CardComponent } from '../card/card.component';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';

@Component({
  selector: 'app-currencies-card',
  imports: [
    MatListModule,
    MatCardModule,
    MatDividerModule,
    CardComponent,
    NumberSpacePipe,
  ],
  templateUrl: './currencies-card.component.html',
  styleUrl: './currencies-card.component.scss',
})
export class CurrenciesCardComponent {
  cashPositions = input<CashPosition[]>();
  sum = computed(() => {
    if (this.cashPositions()) {
      return this.cashPositions()!
        .map((cashPosition) => cashPosition.baseValue)
        .reduce((a, b) => {
          return a + b;
        });
    } else {
      return 0;
    }
  });
}
