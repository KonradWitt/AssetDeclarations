import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../model/person.type';
import { delay, map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { PersonHighlight } from '../model/personHighlight.interface';
import { PersonIdentifier } from '../model/personIdentifier.interface';

interface GetHighlightsResponse {
  id: number;
  fullName: string;
  link: string;
  imageUrl: string;
  netWorth: number;
}

interface GetAllResponse {
  persons: GetAllResponsePersonDTO[];
}

interface GetAllResponsePersonDTO {
  id: number;
  fullName: string;
  link: string;
}

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  url = 'Person';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PersonIdentifier[]> {
    return this.http
      .get<GetAllResponse>(`${environment.apiUrl}/${this.url}/GetAll`)
      .pipe(
        map((dto) =>
          dto.persons.map((personDTO) => ({
            id: personDTO.id,
            fullName: personDTO.fullName,
            link: personDTO.link
          }))
        )
      );
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

  getHighlightsPersons(): Observable<PersonHighlight[]> {
    return this.http
      .get<GetHighlightsResponse[]>(
        `${environment.apiUrl}/${this.url}/GetHighlights`
      )
      .pipe(
        map((dtos) =>
          dtos.map((dto) => ({
            id: dto.id,
            fullName: dto.fullName,
            link: dto.link,
            imageUrl: dto.imageUrl,
            netWorth: dto.netWorth,
          }))
        )
      );
  }
}
