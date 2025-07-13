import { Component, OnInit, output, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { PartyService } from '../../services/party.service';
import { Party } from '../../model/party.interface';
import { map } from 'rxjs';

interface SelectableParty extends Party {
  isSelected: boolean;
}

@Component({
  selector: 'app-parties-selector',
  imports: [MatChipsModule],
  templateUrl: './parties-selector.component.html',
  styleUrl: './parties-selector.component.scss',
})
export class PartiesSelectorComponent implements OnInit {
  constructor(private partyService: PartyService) {}

  parties = signal<SelectableParty[] | undefined>(undefined);
  selectedParties = output<Party[]>();

  ngOnInit(): void {
    this.partyService
      .getAll()
      .pipe(
        map((parties: Party[]): SelectableParty[] =>
          parties.map((party: Party) => ({
            ...party,
            isSelected: true,
          }))
        )
      )
      .subscribe((selectableParties: SelectableParty[]) => {
        this.parties.set(selectableParties);
        this.emitSelectedParties();
      });
  }

  toggleSelection(selectableParty: SelectableParty, isSelected: boolean) {
    this.parties.update((parties) =>
      parties?.map((p) =>
        p.id === selectableParty.id ? { ...p, isSelected } : p
      )
    );
    
    this.emitSelectedParties();
  }

  private emitSelectedParties() {
    this.selectedParties.emit(
      this.parties()
        ?.filter((sp: SelectableParty) => sp.isSelected)
        .map((sp: SelectableParty) => sp as Party) ?? []
    );
  }
}
