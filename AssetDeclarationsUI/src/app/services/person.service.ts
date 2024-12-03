import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../model/person.type';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  url = 'Person';

  constructor(private http: HttpClient) {}

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.apiUrl}/${this.url}/GetAll`);
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${environment.apiUrl}/${this.url}/GetById/${id}`);
  }

  // addPerson(person: Person) {
  //   this.persons.push(person);
  // }

  // deltePerson(id: number) {
  //   var matchingPerson = this.persons.find((person) => person.id == id);
  //   if (matchingPerson !== undefined) {
  //     const index = this.persons.indexOf(matchingPerson, 0);
  //     if (index > -1) {
  //       this.persons.splice(index, 1);
  //     }
  //   }
  // }
}
