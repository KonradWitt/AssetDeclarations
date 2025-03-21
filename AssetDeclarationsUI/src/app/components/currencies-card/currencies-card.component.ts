import { Component, Input, OnInit, signal } from '@angular/core';
import { AssetDeclaration } from '../../model/assetDeclaration.type';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { CashPosition } from '../../model/cashPosition.type';
import {CardComponent} from '../card/card.component'

@Component({
  selector: 'app-currencies-card',
  imports: [MatListModule, MatCardModule, MatDividerModule, CardComponent],
  templateUrl: './currencies-card.component.html',
  styleUrl: './currencies-card.component.scss',
})
export class CurrenciesCardComponent implements OnInit {
  @Input() cashPositions: CashPosition[] | undefined;
  sum = signal<number>(0);

  ngOnInit(): void {
    this.sum.set(
      this.cashPositions!.map((cashPosition) => cashPosition.baseValue).reduce(
        (a, b) => {
          return a + b;
        }
      )
    );
  }
}
