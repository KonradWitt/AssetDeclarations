import { Component, Input, signal, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { defaultPerson, Person } from '../../model/person.type';
import { DatePipe } from '@angular/common';
import { AssetDeclaration } from '../../model/assetDeclaration.type';
import { MatDividerModule } from '@angular/material/divider';
import {CardComponent} from '../card/card.component'
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';


@Component({
  selector: 'app-personal-data-card',
  imports: [MatCardModule, MatGridListModule, MatDividerModule, DatePipe, CardComponent, NumberSpacePipe],
  templateUrl: './personal-data-card.component.html',
  styleUrl: './personal-data-card.component.scss',
})
export class PersonalDataCardComponent {
  @Input() person: Person;
  lastDeclaration = signal<AssetDeclaration | undefined>(undefined);

  constructor() {
    this.person = defaultPerson;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshLastDeclararion();
  }

  private refreshLastDeclararion() {
    this.lastDeclaration.set(
      this.person.assetDeclarations?.sort((x) => x.date.getTime())[
        this.person.assetDeclarations.length - 1
      ]
    );
  }
}
