import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
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
  formControl = new FormControl();
  filteredPersons = new Observable<Person[]>();
  @Output() personSelectedEvent = new EventEmitter<Person>();
  @Input() minimumMatchingLetters = 0;

  ngOnInit(): void {
    this.personService.getPersons().subscribe((persons) => {
      this.filteredPersons = this.formControl.valueChanges.pipe(
        startWith(''),
        filter((x) => typeof x == 'string'),
        map((value) => this.filterPersons(persons, value || ''))
      );
    });
  }

  filterPersons(persons: Person[], name: string): Person[] {
    if (name.length < this.minimumMatchingLetters) {
      return new Array<Person>();
    }

    const filterValue = name.toLowerCase();
    return persons.filter((person) =>
      person.name.toLowerCase().includes(filterValue)
    );
  }

  getPersonName(person: Person): string {
    return person?.name;
  }
}
