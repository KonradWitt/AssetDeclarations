import { Component, computed, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CardComponent } from '../card/card.component';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { SecurityPosition } from '../../model/securityPosition.interface';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-securities-card',
  imports: [
    MatListModule,
    MatDividerModule,
    CardComponent,
    NumberSpacePipe,
    MatTableModule,
  ],
  templateUrl: './securities-card.component.html',
  styleUrl: './securities-card.component.scss',
})
export class SecuritiesCardComponent {
  displayedColumns: string[] = ['name', 'quantity', 'value'];
  securities = input<SecurityPosition[]>();

  sortedSecurities = computed(() => {
    if (!this.securities() || this.securities()?.length === 0) {
      return undefined;
    }

    return this.securities()!.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
  });

  sum = computed(() => {
    if (!this.securities || this.securities()?.length === 0) {
      return 0;
    }

    const sum = this.securities()!
      .map((sec) => sec.value ?? 0)
      .reduce((a, b) => {
        return a + b;
      });
    return Math.round(sum);
  });
}
