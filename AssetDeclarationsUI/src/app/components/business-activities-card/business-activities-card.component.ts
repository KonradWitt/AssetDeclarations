import { Component, computed, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CardComponent } from '../card/card.component';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { MatTableModule } from '@angular/material/table';
import { BusinessActivity } from '../../model/businessActivity.type';

@Component({
  selector: 'app-business-activities-card',
  imports: [
    MatListModule,
    MatDividerModule,
    CardComponent,
    NumberSpacePipe,
    MatTableModule,
  ],
  templateUrl: './business-activities-card.component.html',
  styleUrl: './business-activities-card.component.scss',
})
export class BusinessActivitiesCardComponent {
  displayedColumns: string[] = ['businessName', 'description', 'income'];
  businessActivities = input<BusinessActivity[]>();
  sortedBusinessActivities = computed(() => {
    if (!this.businessActivities() || this.businessActivities()?.length === 0) {
      return undefined;
    }

    return this.businessActivities()!.sort((a, b) => {
      return (b.income ?? -Infinity) - (a.income ?? -Infinity);
    });
  });
  sum = computed(() => {
    if (!this.businessActivities() || this.businessActivities()?.length === 0) {
      return 0;
    }

    const sum = this.businessActivities()!
      .map((x) => x.income ?? 0)
      .reduce((a, b) => a + b);

    return Math.round(sum);
  });
  monthlyIncome = computed(() => this.sum() / 12);
}
