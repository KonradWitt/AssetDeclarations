import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../model/person.type';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  url = 'RealEstate';
  
    constructor(private http: HttpClient) {}

    getAllWithRealEstate(minValue?: number): Observable<Person[]> {
      
      const queryBase = 'GetAllGroupedByPersons';
      let query = '';
  
      if (minValue) query = `${queryBase}?minValue=${minValue}`;
      else query = queryBase;
  
      return this.http.get<Person[]>(
        `${environment.apiUrl}/${this.url}/${query}`
      );
    }
}
