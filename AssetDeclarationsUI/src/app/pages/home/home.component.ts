import { Component, OnInit, signal } from '@angular/core';
import { PersonAutocompleteComponent } from '../../components/person-autocomplete/person-autocomplete.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Person } from '../../model/person.interface';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { HighlightsCarouselComponent } from '../../components/highlights-carousel/highlights-carousel.component';
import { MatDialog } from '@angular/material/dialog';
import { PersonHighlight } from '../../model/personHighlight.interface';
import { PersonIdentifier } from '../../model/personIdentifier.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PersonService } from '../../services/person.service';
import { PersonsListComponent } from '../../components/persons-list/persons-list.component';

@Component({
  selector: 'app-home',
  imports: [
    PersonAutocompleteComponent,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    CommonModule,
    MatProgressSpinnerModule,
    HighlightsCarouselComponent,
    PersonsListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  selectedPerson = signal<PersonIdentifier | undefined>(undefined);
  isLoading = signal<boolean>(false);

  constructor(
    private personService: PersonService,
    private dialogService: MatDialog,
    private router: Router
  ) {}

  onPersonSelected(person: PersonIdentifier | undefined) {
    if (!person) return;

    this.router.navigate(['polityk', person.link]);
  }

  onGetRandomPersonButtonClicked() {
    this.personService.getAll().subscribe((persons) => {
      const randomIndex = Math.floor(Math.random() * persons.length);
      const randomPerson = persons[randomIndex];
      this.onPersonSelected(randomPerson);
    });
  }

  onHighlightPersonClicked(personHighlight: PersonHighlight) {
    this.router.navigate(['polityk', personHighlight.link]);
  }
}
