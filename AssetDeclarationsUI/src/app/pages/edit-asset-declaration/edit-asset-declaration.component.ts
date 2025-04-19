import { Component, signal } from '@angular/core';
import { PersonAutocompleteComponent } from '../../components/person-autocomplete/person-autocomplete.component';
import { Person } from '../../model/person.type';
import { PersonService } from '../../services/person.service';
import {MatTabsModule} from '@angular/material/tabs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-asset-declaration',
  imports: [PersonAutocompleteComponent, MatTabsModule, DatePipe],
  templateUrl: './edit-asset-declaration.component.html',
  styleUrl: './edit-asset-declaration.component.scss',
})
export class EditAssetDeclarationComponent {
  constructor(private personService: PersonService) {}

  person = signal<Person | undefined>(undefined);
  onPersonSelected(person: Person) {
    this.personService
      .getPerson(person.id)
      .subscribe((result) => this.person.set(result));
  }
}
