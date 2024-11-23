import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../model/person.type';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getPersons() {
    const url = 'https://jsonplaceholder.typicode.com/users';
    return this.http.get<Person[]>(url);
  }
}
