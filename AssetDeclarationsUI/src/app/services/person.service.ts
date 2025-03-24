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
    return this.http.get<Person>(
      `${environment.apiUrl}/${this.url}/GetById/${id}`
    );
  }
}
