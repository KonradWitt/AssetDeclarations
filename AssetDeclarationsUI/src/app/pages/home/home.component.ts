import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { PersonAutocompleteComponent } from '../../components/person-autocomplete/person-autocomplete.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { PersonalDataCardComponent } from '../../components/personal-data-card/personal-data-card.component';

@Component({
  selector: 'app-home',
  imports: [
    PersonAutocompleteComponent,
    MatCardModule,
    MatGridListModule,
    PersonalDataCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService
      .getPersonsFromApi()
      .subscribe((persons) => console.log(persons));
  }
}
