import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  model,
  OnChanges,
  OnInit,
  output,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { filter, map, Observable, startWith } from 'rxjs';
import { Person } from '../../model/person.type';
import { PersonService } from '../../services/person.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-person-autocomplete',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './person-autocomplete.component.html',
  styleUrl: './person-autocomplete.component.scss',
})
export class PersonAutocompleteComponent implements OnInit {
  personService = inject(PersonService);

  minimumMatchingLetters = input<number>();
  selectedPerson = output<Person>();

  formControl = new FormControl();
  filteredPersons = new Observable<Person[]>();

  ngOnInit(): void {
    this.personService.getAll().subscribe((persons) => {
      this.filteredPersons = this.formControl.valueChanges.pipe(
        startWith(''),
        filter((x) => typeof x == 'string'),
        map((value) => this.filterPersons(persons, value || ''))
      );
    });
  }

  getPersonName(person: Person): string {
    return person?.fullName;
  }

  private filterPersons(persons: Person[], name: string): Person[] {
    if (
      !this.minimumMatchingLetters ||
      name.length < this.minimumMatchingLetters()!
    ) {
      return new Array<Person>();
    }

    const filterValue = name.toLowerCase();
    return persons.filter((person) =>
      person.fullName.toLowerCase().includes(filterValue)
    );
  }
}
