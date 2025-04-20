import { Component, signal } from '@angular/core';
import { PersonAutocompleteComponent } from '../../components/person-autocomplete/person-autocomplete.component';
import { Person } from '../../model/person.type';
import { AssetDeclaration } from '../../model/assetDeclaration.type';
import { PersonService } from '../../services/person.service';
import { MatTabsModule } from '@angular/material/tabs';
import { DatePipe } from '@angular/common';
import { AssetDeclarationServiceService } from '../../services/asset-declaration-service.service';
import { DataGridComponent } from '../../components/data-grid/data-grid.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-edit-asset-declaration',
  imports: [
    PersonAutocompleteComponent,
    MatTabsModule,
    DatePipe,
    DataGridComponent,
    CardComponent,
  ],
  templateUrl: './edit-asset-declaration.component.html',
  styleUrl: './edit-asset-declaration.component.scss',
})
export class EditAssetDeclarationComponent {
  constructor(
    private personService: PersonService,
    private assetDeclarationService: AssetDeclarationServiceService
  ) {}

  person = signal<Person | undefined>(undefined);
  assetDeclaration = signal<AssetDeclaration | undefined>(undefined);

  onPersonSelected(person: Person) {
    this.personService
      .getPerson(person.id)
      .subscribe((result) => this.person.set(result));
  }

  onSelectedAssetDeclarationChanged(index: number) {
    this.assetDeclaration.set(
      this.person()?.assetDeclarations?.[index] ?? undefined
    );
  }

  onDatachanged(cashPositions: any[]) {
    if (!this.assetDeclaration()) return;

    const ad = this.assetDeclaration();
    ad!.cashPositions = cashPositions;

    this.assetDeclarationService
      .update(ad!.id, ad!)
      .subscribe({
        error: (err) => console.error('Update failed:', err),
      });
  }
}
