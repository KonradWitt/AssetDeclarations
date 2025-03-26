import { E } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  OnInit,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrenciesCardComponent } from '../../components/currencies-card/currencies-card.component';
import { PersonAutocompleteComponent } from '../../components/person-autocomplete/person-autocomplete.component';
import { PersonalDataCardComponent } from '../../components/personal-data-card/personal-data-card.component';
import { Person } from '../../model/person.type';
import { PersonService } from '../../services/person.service';
import { AssetDeclaration } from '../../model/assetDeclaration.type';
import { RealEstateCardComponent } from '../../components/real-estate-card/real-estate-card.component';
import { DeclarationsCardComponent } from '../../components/declarations-card/declarations-card.component';
import { NgxMasonryComponent, NgxMasonryModule } from 'ngx-masonry';

@Component({
  selector: 'app-person',
  imports: [
    PersonAutocompleteComponent,
    MatCardModule,
    MatGridListModule,
    CommonModule,
    NgxMasonryModule,
    PersonalDataCardComponent,
    MatProgressSpinnerModule,
    CurrenciesCardComponent,
    RealEstateCardComponent,
    DeclarationsCardComponent,
  ],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss',
})
export class PersonComponent {
  onLayoutComplete() {
    this.refreshMasonry();
  }
  isLoading = signal<boolean>(false);
  selectedPerson = signal<Person | undefined>(undefined);
  lastDeclaration: Signal<AssetDeclaration | undefined> = computed(() => {
    return this.selectedPerson()?.assetDeclarations?.sort((x) =>
      x.date.getTime()
    )[this.selectedPerson()!.assetDeclarations!.length - 1];
  });

  @ViewChild(NgxMasonryComponent) masonry!: NgxMasonryComponent;

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

  onPersonSelected($event: Person) {
    this.router.navigate(['polityk', $event.link]);
    this.loadPerson($event.id);
  }

  private refreshMasonry(): void {
    this.masonry.reloadItems();
    this.masonry.layout();
  }

  private loadPerson(id: number) {
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
