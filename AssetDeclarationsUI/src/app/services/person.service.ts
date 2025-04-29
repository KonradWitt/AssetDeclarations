import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../model/person.interface';
import { delay, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { PersonHighlight } from '../model/personHighlight.interface';
import { PersonIdentifier } from '../model/personIdentifier.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  url = 'Person';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PersonIdentifier[]> {
    return this.http.get<PersonIdentifier[]>(
      `${environment.apiUrl}/${this.url}/GetAll`
    );
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${environment.apiUrl}/${this.url}/Get/${id}`);
  }

  getPersonByLink(link: string): Observable<Person> {
    return this.http.get<Person>(`${environment.apiUrl}/${this.url}/GetByLink/${link}`);
  }

  getHighlightsPersons(): Observable<PersonHighlight[]> {
    return this.http.get<PersonHighlight[]>(
      `${environment.apiUrl}/${this.url}/GetHighlights`
    );
  }
}
