import { Component, signal } from '@angular/core';
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
  ],
  templateUrl: './edit-asset-declaration.component.html',
  styleUrl: './edit-asset-declaration.component.scss',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class EditAssetDeclarationComponent {
  constructor(
    private personService: PersonService,
    private assetDeclarationService: AssetDeclarationServiceService
  ) {}

  person = signal<Person | undefined>(undefined);
  assetDeclaration = signal<AssetDeclaration | undefined>(undefined);

  onPersonSelected(person: PersonIdentifier) {
    this.personService
      .getPerson(person.id)
      .subscribe((result) => this.person.set(result));
  }

  onSelectedAssetDeclarationChanged(index: number) {
    this.assetDeclaration.set(
      this.person()?.assetDeclarations?.[index] ?? undefined
    );
  }

  onCashPositionsChanged(cashPositions: any[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.cashPositions = cashPositions;
    this.updateAssetDeclaration();
  }

  onRealEstateChanged(realEstate: any[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.realEstate = realEstate;
    this.updateAssetDeclaration();
  }

  onBusinessActivityChanged(businessActivity: any[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.businessActivities = businessActivity;
    this.updateAssetDeclaration();
  }

  onIncomesChanged(incomes: any[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.incomes = incomes;
    this.updateAssetDeclaration();
  }

  onSecurityPositionsChanged(securityPositions: any[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.securityPositions = securityPositions;
    this.updateAssetDeclaration();
  }

  onLiabilitiesChanged(liabilities: any[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.liabilities = liabilities;
    this.updateAssetDeclaration();
  }

  onReceivablesChanged(receivables: any[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.receivables = receivables;
    this.updateAssetDeclaration();
  }

  onPersonalPropertiesChanged(personalProperties: any[]) {
    if (!this.assetDeclaration()) return;

    this.assetDeclaration()!.personalProperties = personalProperties;
    this.updateAssetDeclaration();
  }

  private updateAssetDeclaration(): void {
    if (!this.assetDeclaration()) return;

    const ad = this.assetDeclaration()!;

    this.assetDeclarationService.update(ad.id, ad).subscribe({
      error: (err) => console.error('Update failed:', err),
    });
  }
}
