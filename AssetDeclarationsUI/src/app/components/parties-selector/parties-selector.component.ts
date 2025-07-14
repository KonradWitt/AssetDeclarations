import {
  Component,
  computed,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { PartyService } from '../../services/party.service';
import { Party } from '../../model/party.interface';
import { map } from 'rxjs';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgTemplateOutlet } from '@angular/common';
import { DisplayDeviceService } from '../../services/display-device.service';

interface SelectableParty extends Party {
  isSelected: boolean;
}

@Component({
  selector: 'app-parties-selector',
  imports: [MatChipsModule, MatExpansionModule, NgTemplateOutlet],
  templateUrl: './parties-selector.component.html',
  styleUrl: './parties-selector.component.scss',
})
export class PartiesSelectorComponent implements OnInit {
  readonly displayDeviceService = inject(DisplayDeviceService);
  readonly partyService = inject(PartyService);

  parties = signal<SelectableParty[] | undefined>(undefined);
  selectedPartiesCount = computed(
    () =>
      this.parties()?.filter((sp: SelectableParty) => sp.isSelected).length ?? 0
  );
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
