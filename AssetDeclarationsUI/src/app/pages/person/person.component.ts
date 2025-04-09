import { CommonModule } from '@angular/common';
import { Component, computed, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrenciesCardComponent } from '../../components/currencies-card/currencies-card.component';
import { PersonAutocompleteComponent } from '../../components/person-autocomplete/person-autocomplete.component';
import { PersonalDataCardComponent } from '../../components/personal-data-card/personal-data-card.component';
import { Person } from '../../model/person.type';
import { PersonService } from '../../services/person.service';
import { RealEstateCardComponent } from '../../components/real-estate-card/real-estate-card.component';
import { DeclarationsCardComponent } from '../../components/declarations-card/declarations-card.component';
import { PersonalPropertiesCardComponent } from '../../components/personal-properties-card/personal-properties-card.component';
import { IncomeCardComponent } from '../../components/income-card/income-card.component';
import { SecuritiesCardComponent } from '../../components/securities-card/securities-card.component';
import { LiabilitiesCardComponent } from "../../components/liabilities-card/liabilities-card.component";
import { ReceivablesCardComponent } from "../../components/receivables-card/receivables-card.component";
import { BusinessActivitiesCardComponent } from "../../components/business-activities-card/business-activities-card.component";

@Component({
  selector: 'app-person',
  imports: [
    PersonAutocompleteComponent,
    MatCardModule,
    MatGridListModule,
    CommonModule,
    PersonalDataCardComponent,
    MatProgressSpinnerModule,
    CurrenciesCardComponent,
    RealEstateCardComponent,
    DeclarationsCardComponent,
    PersonalPropertiesCardComponent,
    IncomeCardComponent,
    SecuritiesCardComponent,
    LiabilitiesCardComponent,
    ReceivablesCardComponent,
    BusinessActivitiesCardComponent
],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
})
export class PersonComponent {
  isLoading = signal<boolean>(false);
  selectedPerson = signal<Person | undefined>(undefined);
  lastDeclaration = computed(() => {
    return this.selectedPerson()?.assetDeclarations?.sort((x) =>
      x.date.getTime()
    )[this.selectedPerson()!.assetDeclarations!.length - 1];
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personService: PersonService
  ) {
    this.selectedPerson.set(undefined);
    const navigationState = this.router?.getCurrentNavigation()?.extras?.state;
    if (navigationState) {
      const id = navigationState['id'];
      this.loadPerson(id);
    } else {
      var routedId = this.route.snapshot.paramMap.get('link');
      if (routedId == null) {
        return;
      } else {
        this.isLoading.set(true);
        this.personService
          .getPersonByLink(routedId)
          .subscribe((person) => this.loadPerson(person.id));
      }
    }
  }

  onPersonSelected(person: Person | undefined) {
    if (!person) return;

    this.router
      .navigate(['polityk', person.link])
      .then(() => this.loadPerson(person.id));
  }

  private loadPerson(id: number) {
    this.selectedPerson.set(undefined);
    this.isLoading.set(true);
    this.personService.getPerson(id).subscribe((person) => {
      this.isLoading.set(false);
      if (person == null) {
        this.router.navigate(['polityk']);
      } else {
        this.selectedPerson.set(person);
      }
    });
  }
}
