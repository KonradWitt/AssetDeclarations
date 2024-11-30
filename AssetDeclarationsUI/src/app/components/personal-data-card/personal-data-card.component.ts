import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-personal-data-card',
  imports: [MatCardModule, MatGridListModule],
  templateUrl: './personal-data-card.component.html',
  styleUrl: './personal-data-card.component.scss',
})
export class PersonalDataCardComponent {}
