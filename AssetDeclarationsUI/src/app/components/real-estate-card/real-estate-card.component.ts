import {
  Component,
  computed,
  effect,
  input,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { RealEstate } from '../../model/realEstate.type';
import { CardComponent } from '../card/card.component';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';

@Component({
  selector: 'app-real-estate-card',
  imports: [
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    CardComponent,
    NumberSpacePipe,
  ],
  templateUrl: './real-estate-card.component.html',
  styleUrl: './real-estate-card.component.scss',
})
export class RealEstateCardComponent {
  displayedColumns: string[] = ['description', 'legalTitle', 'value'];
  realEstate = input<RealEstate[] | undefined>(undefined);
  sortedRealEstate = computed(() => {
    if (!this.realEstate() || this.realEstate()?.length === 0) return undefined;
    else return this.realEstate()!.sort((a, b) => b.value - a.value);
  });

  sumValue = computed(() => {
    if (!this.realEstate() || this.realEstate()?.length === 0) {
      return 0;
    } else {
      return this.realEstate()!
        .map((property) => property.value)
        .reduce((a, b) => {
          return a + b;
        });
    }
  });
  numberOfProperties = computed(() => {
    if (!this.realEstate()) return 0;
    else return this.realEstate()!.length;
  });
}
