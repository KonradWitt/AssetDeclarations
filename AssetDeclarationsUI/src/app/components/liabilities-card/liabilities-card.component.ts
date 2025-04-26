import { Component, computed, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CardComponent } from '../card/card.component';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { MatTableModule } from '@angular/material/table';
import { Liability } from '../../model/liability.interface';

@Component({
  selector: 'app-liabilities-card',
  imports: [
    MatListModule,
    MatDividerModule,
    CardComponent,
    NumberSpacePipe,
    MatTableModule,
  ],
  templateUrl: './liabilities-card.component.html',
  styleUrl: './liabilities-card.component.scss',
})
export class LiabilitiesCardComponent {
  liabilities = input<Liability[]>();
  sum = computed(() => {
    if (!this.liabilities() || this.liabilities()?.length === 0) return 0;
    const sum = this.liabilities()!
      .map((x) => x.value ?? 0)
      .reduce((a, b) => {
        return a + b;
      });
    return Math.round(sum);
  });

  sortedLiabilities = computed(() => {
    if (!this.liabilities() || this.liabilities()?.length === 0) {
      return undefined;
    }

    return this.liabilities()?.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
  });

  displayedColumns: string[] = ['description', 'value'];
}
