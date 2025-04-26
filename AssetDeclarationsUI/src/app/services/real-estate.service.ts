import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../model/person.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RealEstate } from '../model/realEstate.interface';
import { PersonIdentifier } from '../model/personIdentifier.interface';

export interface GetAllPaginatedResponse {
  realEstate: RealEstate;
  personId: string;
  personFullName: string;
  personLink: string;
}

@Injectable({
  providedIn: 'root',
})
export class RealEstateService {
  url = 'RealEstate';

  constructor(private http: HttpClient) {}

  getAllGroupedByPersons(minValue?: number): Observable<Person[]> {
    const queryBase = 'GetAllGroupedByPersons';
    let query = '';

    if (minValue) query = `${queryBase}?minValue=${minValue}`;
    else query = queryBase;

    return this.http.get<Person[]>(
      `${environment.apiUrl}/${this.url}/${query}`
    );
  }

  getCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/${this.url}/GetCount`);
  }

  getAllPaginated(
    page: number,
    pageSize: number
  ): Observable<GetAllPaginatedResponse[]> {
    return this.http.get<GetAllPaginatedResponse[]>(
      `${environment.apiUrl}/${this.url}/GetAllPaginated`,
      {
        params: { page: page, pageSize: pageSize },
      }
    );
  }
}
