import { Component, OnInit, signal } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { PersonAutocompleteComponent } from '../../components/person-autocomplete/person-autocomplete.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { PersonalDataCardComponent } from '../../components/personal-data-card/personal-data-card.component';
import { Person } from '../../model/person.type';
import { CommonModule } from '@angular/common';
import { delay } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrenciesCardComponent } from '../../components/currencies-card/currencies-card.component';
import { Router } from '@angular/router';
import { NetWorthTrendCardComponent } from '../../components/net-worth-trend-card/net-worth-trend-card.component';

@Component({
  selector: 'app-home',
  imports: [
    PersonAutocompleteComponent,
    MatCardModule,
    MatGridListModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  selectedPerson = signal<Person | undefined>(undefined);
  isLoading = signal<boolean>(false);

  constructor(private personService: PersonService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onPersonSelected($event: Person) {
    this.router.navigate(['polityk', $event.id])
  }
}
