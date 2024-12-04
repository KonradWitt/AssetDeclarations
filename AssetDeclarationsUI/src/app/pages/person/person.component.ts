import { E } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrenciesCardComponent } from '../../components/currencies-card/currencies-card.component';
import { PersonAutocompleteComponent } from '../../components/person-autocomplete/person-autocomplete.component';
import { PersonalDataCardComponent } from '../../components/personal-data-card/personal-data-card.component';
import { Person } from '../../model/person.type';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person',
  imports: [
    PersonAutocompleteComponent,
    MatCardModule,
    MatGridListModule,
    PersonalDataCardComponent,
    CommonModule,
    MatProgressSpinnerModule,
    CurrenciesCardComponent,
  ],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
})
export class PersonComponent implements OnInit {
  selectedPerson = signal<Person | undefined>(undefined);
  isLoading = signal<boolean>(false);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    
    this.isLoading.set(true);
    var routedId = this.route.snapshot.paramMap.get('id');
    if (routedId == null) {
      return;
    } else {
      var id = parseInt(routedId!);
      this.loadPerson(id);
    }
  }

  onPersonSelected($event: Person) {
    this.router.navigate(['polityk', $event.id])
    this.loadPerson($event.id);
  }

  private loadPerson(id: number) {
    this.isLoading.set(true);
    this.personService.getPerson(id).subscribe((person) => {
      this.selectedPerson.set(person);
      this.isLoading.set(false);
    });
  }
}
