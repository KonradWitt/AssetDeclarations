import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../model/person.interface';
import { delay, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { PersonHighlight } from '../model/personHighlight.interface';
import { PersonIdentifier } from '../model/personIdentifier.interface';
import { PersonListed } from '../model/personListed.interface';
import { PersonSortDirection, PersonSortKey } from '../model/personSort.enum';
import { PersonUpdate } from '../model/personUpdate.interface';

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

  getListPaginated(
    partiesIds: number[],
    page: number,
    pageSize: number,
    sortKey: PersonSortKey | null,
    sortDirection: PersonSortDirection | null
  ): Observable<PersonListed[]> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (sortKey !== null) {
      params = params.set('sortKey', sortKey.toString());
    }

    if (sortDirection !== null) {
      params = params.set('sortDirection', sortDirection.toString());
    }

    if (partiesIds.length > 0) {
      params = params.set('partiesIds', partiesIds.toString());
    }

    return this.http.get<PersonListed[]>(
      `${environment.apiUrl}/${this.url}/GetList`,
      { params }
    );
  }

  getListCount(partiesIds: number[]): Observable<number> {
    let params = new HttpParams();

    if (partiesIds.length > 0) {
      params = params.set('partiesIds', partiesIds.toString());
    }

    return this.http.get<number>(
      `${environment.apiUrl}/${this.url}/GetListCount`,
      { params }
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

    update(
      person: PersonUpdate
    ): Observable<Person> {
      return this.http.put<Person>(
        `${environment.apiUrl}/${this.url}/Update`,
        person
      );
    }
}
