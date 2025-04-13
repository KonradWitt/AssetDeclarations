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

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(`${environment.apiUrl}/${this.url}/GetAll`);
  }

  getAllWithRealEstate(minValue?: number): Observable<Person[]> {
    let query = '';

    if (minValue) query = `GetAllWithRealEstate?minValue=${minValue}`;
    else query = `GetAllWithRealEstate`;

    return this.http.get<Person[]>(`${environment.apiUrl}/${this.url}/${query}`);
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${environment.apiUrl}/${this.url}/Get/${id}`);
  }

  getPersonByLink(link: string): Observable<Person> {
    return new Observable<Person>((observer) => {
      this.getAll().subscribe(
        (persons) => {
          const matchingPerson = persons.find((person) => person.link === link);

          if (matchingPerson) {
            this.getPerson(matchingPerson.id).subscribe(
              (person) => {
                observer.next(person);
                observer.complete();
              },
              (error) => {
                observer.error(error);
              }
            );
          } else {
            observer.error(new Error('Person not found'));
          }
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  getHighlightsPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(
      `${environment.apiUrl}/${this.url}/GetHighlights`
    );
  }
}
