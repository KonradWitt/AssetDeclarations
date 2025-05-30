import { CommonModule } from '@angular/common';
import { Component, computed, signal, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrenciesCardComponent } from '../../components/currencies-card/currencies-card.component';
import { PersonalDataCardComponent } from '../../components/personal-data-card/personal-data-card.component';
import { Person } from '../../model/person.interface';
import { PersonService } from '../../services/person.service';
import { RealEstateCardComponent } from '../../components/real-estate-card/real-estate-card.component';
import { DeclarationsCardComponent } from '../../components/declarations-card/declarations-card.component';
import { PersonalPropertiesCardComponent } from '../../components/personal-properties-card/personal-properties-card.component';
import { IncomeCardComponent } from '../../components/income-card/income-card.component';
import { SecuritiesCardComponent } from '../../components/securities-card/securities-card.component';
import { LiabilitiesCardComponent } from '../../components/liabilities-card/liabilities-card.component';
import { ReceivablesCardComponent } from '../../components/receivables-card/receivables-card.component';
import { BusinessActivitiesCardComponent } from '../../components/business-activities-card/business-activities-card.component';

@Component({
  selector: 'app-person',
  imports: [
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
    BusinessActivitiesCardComponent,
  ],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
})
export class PersonComponent {
  isLoading = signal<boolean>(false);
  selectedPerson = signal<Person | undefined>(undefined);
  lastDeclaration = computed(() => {
    return this.selectedPerson()?.assetDeclarations?.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )[this.selectedPerson()!.assetDeclarations!.length - 1];
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private personService: PersonService
  ) {
    const routedId = this.route.snapshot.paramMap.get('link');
    if (routedId) {
      this.isLoading.set(true);
      this.personService.getPersonByLink(routedId).subscribe({
        next: (person) => {
          this.selectedPerson.set(person);
          this.isLoading.set(false);
        },
        error: (err) => this.router.navigate(['polityk']),
      });
    } else {
      this.router.navigate(['polityk']);
    }
  }
}
