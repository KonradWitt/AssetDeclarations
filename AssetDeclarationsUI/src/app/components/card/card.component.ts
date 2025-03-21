import { NgIf } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'card',
  imports: [MatDivider, NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() showFooter: boolean = false;
}
