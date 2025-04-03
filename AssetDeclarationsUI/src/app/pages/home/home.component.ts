import { Component, OnInit, signal } from '@angular/core';
import { PersonAutocompleteComponent } from '../../components/person-autocomplete/person-autocomplete.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Person } from '../../model/person.type';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { HighlightsCarouselComponent } from '../../components/highlights-carousel/highlights-carousel.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  imports: [
    PersonAutocompleteComponent,
    MatCardModule,
    MatGridListModule,
    CommonModule,
    MatProgressSpinnerModule,
    HighlightsCarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  selectedPerson = signal<Person | undefined>(undefined);
  isLoading = signal<boolean>(false);

  constructor(private dialogService: MatDialog, private router: Router) {}

  onPersonSelected($event: Person) {
    this.router.navigate(['polityk', $event.link], {
      state: { id: $event.id },
    });
  }
}
