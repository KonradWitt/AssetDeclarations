import { Component, computed, OnInit, signal } from '@angular/core';
import { PersonAutocompleteComponent } from '../../components/person-autocomplete/person-autocomplete.component';
import { Person } from '../../model/person.interface';
import { AssetDeclaration } from '../../model/assetDeclaration.interface';
import { PersonService } from '../../services/person.service';
import { MatTabsModule } from '@angular/material/tabs';
import { DatePipe } from '@angular/common';
import { AssetDeclarationServiceService } from '../../services/asset-declaration-service.service';
import { DataGridComponent } from '../../components/data-grid/data-grid.component';
import { CardComponent } from '../../components/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DATE_FORMATS,
  MatDateFormats,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PersonIdentifier } from '../../model/personIdentifier.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CashPosition } from '../../model/cashPosition.interface';
import { RealEstate } from '../../model/realEstate.interface';
import { PersonalProperty } from '../../model/personalProperty.interface';
import { Income } from '../../model/income.interface';
import { SecurityPosition } from '../../model/securityPosition.interface';
import { Liability } from '../../model/liability.interface';
import { Receivable } from '../../model/receivable.interface';
import { BusinessActivity } from '../../model/businessActivity.interface';
import {
  AssetDeclarationUpdate,
  AssetDeclarationUpdateContent as AssetDeclarationUpdateBody,
} from '../../model/assetDeclarationUpdate.interface';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { PersonUpdate } from '../../model/personUpdate.interface';
import { Party } from '../../model/party.interface';
import { PartyService } from '../../services/party.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-edit-asset-declaration',
  imports: [
    PersonAutocompleteComponent,
    MatButtonModule,
    MatTabsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    DatePipe,
    DataGridComponent,
    CardComponent,
    MatDatepickerModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  templateUrl: './edit-asset-declaration.component.html',
  styleUrl: './edit-asset-declaration.component.scss',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class EditAssetDeclarationComponent implements OnInit {
  constructor(
    private personService: PersonService,
    private partyService: PartyService,
    private assetDeclarationService: AssetDeclarationServiceService,
    private snackBar: MatSnackBar
  ) {}
  person = signal<Person | undefined>(undefined);
  personData: PersonUpdate | undefined;
  assetDeclaration = signal<AssetDeclaration | undefined>(undefined);
  parties = signal<Party[] | undefined>(undefined);
  selectedParty = computed(() => {
    return this.parties()?.find((p) => p.id === this.person()?.partyId);
  });

  ngOnInit(): void {
    this.partyService.getAll().subscribe((result) => this.parties.set(result));
  }

  partyDisplayFn(party: Party): string {
    return party.name;
  }

  onPersonSelected(person: PersonIdentifier) {
    this.personService.getPersonByLink(person.link).subscribe((result) => {
      this.person.set(result);
      this.personData = {
        id: result.id,
        firstName: result.firstName,
        lastName: result.lastName,
        dateOfBirth: result.dateOfBirth,
        placeOfBirth: result.placeOfBirth,
        isHighlight: result.isHighlight,
        partyId: result.partyId ?? 0,
      };

      console.log(this.personData);
    });
  }

  onSelectedAssetDeclarationChanged(index: number) {
    this.assetDeclaration.set(
      this.person()?.assetDeclarations?.[index] ?? undefined
    );
  }

  onCashPositionsChanged(cashPositions: CashPosition[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.cashPositions = cashPositions;
    this.updateAssetDeclaration({ cashPositions });
  }

  onRealEstateChanged(realEstate: RealEstate[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.realEstate = realEstate;
    this.updateAssetDeclaration({ realEstate });
  }

  onBusinessActivityChanged(businessActivities: BusinessActivity[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.businessActivities = businessActivities;
    this.updateAssetDeclaration({ businessActivities });
  }

  onIncomesChanged(incomes: Income[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.incomes = incomes;
    this.updateAssetDeclaration({ incomes });
  }

  onSecurityPositionsChanged(securityPositions: SecurityPosition[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.securityPositions = securityPositions;
    this.updateAssetDeclaration({ securityPositions });
  }

  onLiabilitiesChanged(liabilities: Liability[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.liabilities = liabilities;
    this.updateAssetDeclaration({ liabilities });
  }

  onReceivablesChanged(receivables: Receivable[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.receivables = receivables;
    this.updateAssetDeclaration({ receivables });
  }

  onPersonalPropertiesChanged(personalProperties: PersonalProperty[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.personalProperties = personalProperties;
    this.updateAssetDeclaration({ personalProperties });
  }

  private updateAssetDeclaration(params: AssetDeclarationUpdateBody): void {
    if (!this.assetDeclaration()) return;

    const adUpdate = {
      id: this.assetDeclaration()!.id,
      cashPositions: params.cashPositions,
      realEstate: params.realEstate,
      personalProperties: params.personalProperties,
      incomes: params.incomes,
      securityPositions: params.securityPositions,
      liabilities: params.liabilities,
      receivables: params.receivables,
      businessActivities: params.businessActivities,
    } satisfies AssetDeclarationUpdate;

    this.assetDeclarationService.update(adUpdate).subscribe({
      next: () => {
        this.snackBar.open('Dane zostały zaktualizowane.', 'OK', {
          duration: 2000,
        });
      },

      error: (err) => {
        console.error('Update failed:', err),
          this.snackBar.open(
            'Wystąpił błąd podczas zapisywania danych. Spróbuj zalogować się ponownie.',
            'OK',
            { duration: 5000 }
          );
      },
    });
  }
}
