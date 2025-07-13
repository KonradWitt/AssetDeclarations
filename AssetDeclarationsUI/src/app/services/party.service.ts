import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Party } from '../model/party.interface';
import { environment } from '../../environments/environment';
import { min, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  url = 'Party';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Party[]> {
    return this.http.get<Party[]>(`${environment.apiUrl}/${this.url}/GetAll`);
  }

  getAvgNetWorthPerParty(): Observable<
    { party: Party; averageNetWorth: number; medianNetWorth: number }[]
  > {
    return this.http.get<
      { party: Party; averageNetWorth: number; medianNetWorth: number }[]
    >(`${environment.apiUrl}/${this.url}/GetAverageNetWorth`);
  }

  getAvgRealEstateCountPerParty(
    minValue: number
  ): Observable<{ party: Party; averageRealEstateCount: number }[]> {
    return this.http.get<{ party: Party; averageRealEstateCount: number }[]>(
      `${environment.apiUrl}/${this.url}/GetAverageRealEstateCount`,
      {
        params: { minValue: minValue },
      }
    );
  }
}
