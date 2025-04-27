import {
  Component,
  computed,
  input,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Person } from '../../model/person.interface';
import { DatePipe } from '@angular/common';
import { AssetDeclaration } from '../../model/assetDeclaration.interface';
import { MatDividerModule } from '@angular/material/divider';
import { CardComponent } from '../card/card.component';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';

@Component({
  selector: 'app-personal-data-card',
  imports: [
    MatCardModule,
    MatGridListModule,
    MatDividerModule,
    DatePipe,
    CardComponent,
    NumberSpacePipe,
  ],
  templateUrl: './personal-data-card.component.html',
  styleUrl: './personal-data-card.component.scss',
})
export class PersonalDataCardComponent {
  person = input<Person>();
  
  lastDeclaration = computed(
    () =>
      this.person()?.assetDeclarations?.sort((x) => new Date(x.date).getTime())[
        this.person()!.assetDeclarations!.length - 1
      ] ?? undefined
  );
}
