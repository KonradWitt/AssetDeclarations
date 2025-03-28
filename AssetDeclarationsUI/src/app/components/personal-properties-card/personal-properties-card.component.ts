import { Component, Input, input, OnInit, signal } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { PersonalProperty } from '../../model/personalProperty.type';
import { MatTableModule } from '@angular/material/table';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';

@Component({
  selector: 'app-personal-properties-card',
  imports: [CardComponent, MatTableModule, NumberSpacePipe],
  templateUrl: './personal-properties-card.component.html',
  styleUrl: './personal-properties-card.component.scss',
})
export class PersonalPropertiesCardComponent implements OnInit {
  displayedColumns: string[] = ['description', 'value'];
  sumValue = signal<number>(0);
  @Input() personalProperties: PersonalProperty[] = [];

  ngOnInit(): void {
    this.personalProperties.sort((a, b) => b.value - a.value);

    this.sumValue.set(
      this.personalProperties?.map((x) => x.value).reduce((a, b) => a + b)
    );
  }
}
