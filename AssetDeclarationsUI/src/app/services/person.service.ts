import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../model/person.interface';
import { delay, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { PersonHighlight } from '../model/personHighlight.interface';
import { PersonIdentifier } from '../model/personIdentifier.interface';
import { PersonListed } from '../model/personListed.interface';

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

  getAllPaginated(
    page: number,
    pageSize: number
  ): Observable<PersonListed[]> {
    return this.http.get<PersonListed[]>(
      `${environment.apiUrl}/${this.url}/GetList`,
      {
        params: { page: page, pageSize: pageSize },
      }
    );
  }

  getCount() : Observable<number>{
    return this.http.get<number>(
      `${environment.apiUrl}/${this.url}/GetCount`
    );
  }

  getPersonByLink(link: string): Observable<Person> {
    return this.http.get<Person>(
      `${environment.apiUrl}/${this.url}/GetByLink/${link}`
    );
  }

  getHighlightsPersons(): Observable<PersonHighlight[]> {
    return this.http.get<PersonHighlight[]>(
      `${environment.apiUrl}/${this.url}/GetHighlights`
    );
  }
}
