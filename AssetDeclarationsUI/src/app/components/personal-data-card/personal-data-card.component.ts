import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Person } from '../../model/person.type';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-personal-data-card',
  imports: [MatCardModule, MatGridListModule, DatePipe],
  templateUrl: './personal-data-card.component.html',
  styleUrl: './personal-data-card.component.scss',
})
export class PersonalDataCardComponent {
  @Input() person: Person;

  constructor() {
    this.person = {
      id: 0,
      name: '',
      dateOfBirth: new Date('2019-01-16'),
      placeOfBirth: '',
    };
  }
}
