import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../model/person.type';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  persons: Person[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alice Johnson' },
    { id: 4, name: 'Bob Brown' },
    { id: 5, name: 'Charlie Davis' },
  ];

  constructor(private http: HttpClient) {}

  getPersons() {
    return of(this.persons);
  }

  addPerson(person: Person) {
    this.persons.push(person);
  }

  deltePerson(id: number) {
    var matchingPerson = this.persons.find((person) => person.id == id);
    if (matchingPerson !== undefined) {
      const index = this.persons.indexOf(matchingPerson, 0);
      if (index > -1) {
        this.persons.splice(index, 1);
      }
    }
  }
}
