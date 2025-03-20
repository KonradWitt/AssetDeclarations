import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { RealEstate } from '../../model/realEstate.type';


const RE_DATA: RealEstate[] = [
  {id: 1, description: 'Mieszkanie duże ładne 120m', value: 1000, legalTitle: 'Własność'},
  {id: 2, description: 'Dom 300m', value: 20000, legalTitle: 'Współwłasność małżeńska'},
];

@Component({
  selector: 'app-real-estate-card',
  imports: [MatTableModule, MatCardModule, MatDividerModule],
  templateUrl: './real-estate-card.component.html',
  styleUrl: './real-estate-card.component.scss'
})


export class RealEstateCardComponent {
  displayedColumns: string[] = ['description', 'legalTitle', 'value'];
  dataSource = RE_DATA;
}
