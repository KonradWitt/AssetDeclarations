import { Component, Input, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { RealEstate } from '../../model/realEstate.type';
import { CardComponent } from '../card/card.component';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';

@Component({
  selector: 'app-real-estate-card',
  imports: [MatTableModule, MatCardModule, MatDividerModule, CardComponent, NumberSpacePipe],
  templateUrl: './real-estate-card.component.html',
  styleUrl: './real-estate-card.component.scss',
})
export class RealEstateCardComponent implements OnInit {
  displayedColumns: string[] = ['description', 'legalTitle', 'value'];
  @Input() realEstate: RealEstate[] = [];
  sumValue = signal<number>(0);
  numberOfProperties = signal<number>(0);

  ngOnInit(): void {
    this.numberOfProperties.set(this.realEstate.length);
    this.sumValue.set(
      this.realEstate
        .map((property) => property.value)
        .reduce((a, b) => {
          return a + b;
        })
    );
  }
}
