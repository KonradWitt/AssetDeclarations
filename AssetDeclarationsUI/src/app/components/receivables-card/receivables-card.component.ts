import { Component, computed, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CardComponent } from '../card/card.component';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { MatTableModule } from '@angular/material/table';
import { Receivable } from '../../model/receivable.interface';

@Component({
  selector: 'app-receivables-card',
  imports: [MatListModule, CardComponent, NumberSpacePipe, MatTableModule],
  templateUrl: './receivables-card.component.html',
  styleUrl: './receivables-card.component.scss',
})
export class ReceivablesCardComponent {
  receivables = input<Receivable[]>();

  sum = computed(() => {
    if (!this.receivables() || this.receivables()?.length === 0) return 0;
    const sum = this.receivables()!
      .map((x) => x.value ?? 0)
      .reduce((a, b) => {
        return a + b;
      });
    return Math.round(sum);
  });

  sortedReceivables = computed(() => {
    if (!this.receivables() || this.receivables()?.length === 0) {
      return undefined;
    }

    return this.receivables()?.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
  });

  displayedColumns: string[] = ['description', 'value'];
}
