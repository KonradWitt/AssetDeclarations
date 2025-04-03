import { Component, computed, input } from '@angular/core';
import { Income } from '../../model/income.type';
import { CardComponent } from '../card/card.component';
import { MatTableModule } from '@angular/material/table';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';

@Component({
  selector: 'app-income-card',
  imports: [CardComponent, MatTableModule, NumberSpacePipe],
  templateUrl: './income-card.component.html',
  styleUrl: './income-card.component.scss',
})
export class IncomeCardComponent {
  displayedColumns: string[] = ['description', 'yearlyValue'];

  incomes = input<Income[]>();

  sortedIncomes = computed(() => {
    if (!this.incomes() || this.incomes()?.length === 0) return undefined;
    else {
      return this.incomes()!.sort((a, b) => b.yearlyValue - a.yearlyValue);
    }
  });

  sum = computed(() => {
    if (!this.incomes() || this.incomes()?.length === 0) return 0;
    else {
      const sum = this.incomes()!
        .map((x) => x.yearlyValue)
        .reduce((a, b) => a + b);
      return sum;
    }
  });
}
