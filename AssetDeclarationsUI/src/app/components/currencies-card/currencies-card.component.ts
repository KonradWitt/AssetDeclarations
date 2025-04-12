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
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-currencies-card',
  imports: [
    MatListModule,
    MatCardModule,
    MatDividerModule,
    CardComponent,
    NumberSpacePipe,
    MatTableModule,
  ],
  templateUrl: './currencies-card.component.html',
  styleUrl: './currencies-card.component.scss',
})
export class CurrenciesCardComponent {
  displayedColumns: string[] = ['currencyValue', 'currency', 'baseValue'];
  cashPositions = input<CashPosition[]>();
  sum = computed(() => {
    if (!this.cashPositions() || this.cashPositions()?.length === 0) return 0;

    const sum = this.cashPositions()!
      .map((cashPosition) => cashPosition.baseValue)
      .reduce((a, b) => {
        return a + b;
      });
    return Math.round(sum);
  });

  sortedCash = computed(() => {
    if (!this.cashPositions() || this.cashPositions()?.length === 0) {
      return undefined;
    }

    return this.cashPositions()?.sort((a, b) => 
      (b.baseValue ?? 0) - (a.baseValue ?? 0)
    );
  });
}
