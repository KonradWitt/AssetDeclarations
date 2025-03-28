import { NgIf } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  Input,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'card',
  imports: [MatDivider, NgIf, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() showFooter: boolean = false;
  @Input() title: string = '';
  @Input() iconName: string = '';
}
