import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { RealEstate } from '../../model/realEstate.type';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-real-estate-card',
  imports: [MatTableModule, MatCardModule, MatDividerModule, CardComponent],
  templateUrl: './real-estate-card.component.html',
  styleUrl: './real-estate-card.component.scss',
})
export class RealEstateCardComponent {
  @Input() realEstate: RealEstate[] = [];
  displayedColumns: string[] = ['description', 'legalTitle', 'value'];
}
