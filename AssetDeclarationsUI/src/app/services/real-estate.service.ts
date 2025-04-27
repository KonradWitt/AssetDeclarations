import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../model/person.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RealEstate } from '../model/realEstate.interface';
import { PersonIdentifier } from '../model/personIdentifier.interface';

@Injectable({
  providedIn: 'root',
})
export class RealEstateService {
  url = 'RealEstate';

  constructor(private http: HttpClient) {}

  getCountPerPerson(
    minValue?: number
  ): Observable<{ person: Person; realEstateCount: number }[]> {
    const queryBase = 'GetCountPerPerson';
    let query = '';

    if (minValue) query = `${queryBase}?minValue=${minValue}`;
    else query = queryBase;

    return this.http.get<{ person: Person; realEstateCount: number }[]>(
      `${environment.apiUrl}/${this.url}/${query}`
    );
  }

  getCount(): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/${this.url}/GetCount`);
  }

  getAllPaginated(
    page: number,
    pageSize: number
  ): Observable<{ person: Person; realEstate: RealEstate }[]> {
    return this.http.get<{ person: Person; realEstate: RealEstate }[]>(
      `${environment.apiUrl}/${this.url}/GetAllPaginated`,
      {
        params: { page: page, pageSize: pageSize },
      }
    );
  }
}
