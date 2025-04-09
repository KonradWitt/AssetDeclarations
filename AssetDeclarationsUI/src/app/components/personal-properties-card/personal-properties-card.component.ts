import {
  Component,
  computed,
  Input,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { CardComponent } from '../card/card.component';
import { PersonalProperty } from '../../model/personalProperty.type';
import { MatTableModule } from '@angular/material/table';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { E } from '@angular/cdk/keycodes';
import { _ErrorStateTracker } from '@angular/material/core';

@Component({
  selector: 'app-personal-properties-card',
  imports: [CardComponent, MatTableModule, NumberSpacePipe],
  templateUrl: './personal-properties-card.component.html',
  styleUrl: './personal-properties-card.component.scss',
})
export class PersonalPropertiesCardComponent {
  displayedColumns: string[] = ['description', 'value'];
  personalProperties = input<PersonalProperty[]>();

  sumValue = computed(() => {
    if (!this.personalProperties() || this.personalProperties()?.length === 0)
      return 0;

    const sum = this.personalProperties()!
      .map((x) => x.value)
      .reduce((a, b) => a + b);
    return Math.round(sum);
  });

  sortedPersonalProperties = computed(() => {
    if (!this.personalProperties() || this.personalProperties()?.length === 0)
      return undefined;
    else return this.personalProperties()!.sort((a, b) => b.value - a.value);
  });
}
