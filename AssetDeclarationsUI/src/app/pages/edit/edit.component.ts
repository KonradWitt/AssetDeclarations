import { Component, OnInit, signal } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../model/person.type';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PersonAutocompleteComponent } from '../../components/person-autocomplete/person-autocomplete.component';

@Component({
  selector: 'app-edit',
  imports: [MatListModule, MatButtonModule, MatIconModule, PersonAutocompleteComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  constructor(private personService: PersonService) {}

  persons = signal<Person[]>([]);
  selectedPerson = signal<Person | null>(null);

  ngOnInit(): void {
    this.personService
      .getPersons()
      .subscribe((persons) => this.persons.set(persons));
  }

  onPersonSelected(selectedPerson: Person): void {
    this.selectedPerson.set(selectedPerson);
  }
}
