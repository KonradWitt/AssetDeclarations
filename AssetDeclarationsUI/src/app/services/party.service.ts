import { Injectable } from '@angular/core';
import { Party } from '../model/party.type';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  parties: Party[] = [
    { id: 1, name: 'Partia Dobrego Panka' },
    { id: 2, name: 'Kasztanowe Cwaniaki' },
    { id: 3, name: 'Nadzwyczaj Niezdecydowani' },
  ];

  getParties() {
    return of(this.parties);
  }

}
