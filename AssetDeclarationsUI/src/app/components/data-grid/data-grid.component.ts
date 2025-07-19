import {
  Component,
  computed,
  input,
  linkedSignal,
  model,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ColumnDefinition } from './column-definition';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRipple, MatRippleModule } from '@angular/material/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { TextFieldModule } from '@angular/cdk/text-field';

@Component({
  selector: 'app-data-grid',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    FormsModule,
    MatRippleModule,
    TextFieldModule,
  ],
  templateUrl: './data-grid.component.html',
  styleUrl: './data-grid.component.scss',
})
export class DataGridComponent {
  @ViewChild(MatRipple) ripple: MatRipple | undefined;

  columns = input.required<ColumnDefinition[]>();
  data = model.required<any[]>();
  readonly headers = computed(() => this.columns().map((x) => x.key));
  internalData = linkedSignal<any[]>(() => {
    console.log(this.data());
    return JSON.parse(JSON.stringify(this.data()));
  });
  saveAnimationState: string = 'start';

  undo(): void {
    this.initializeInternalData();
  }

  removeRow(element: any): void {
    const removeIndex = this.internalData().indexOf(element);
    console.log(removeIndex);
    if (removeIndex === -1) return;

    const newData = [
      ...this.internalData().slice(0, removeIndex),
      ...this.internalData().slice(removeIndex + 1),
    ];

    this.internalData.set(newData);
  }
  addRow(): void {
    this.internalData()[this.internalData().length - 1];
    const newRow: { [key: string]: any } = {};
    this.columns().forEach((colDef) => {
      if (colDef.type === 'number') {
        newRow[colDef.key] = 0;
      } else if (colDef.type === 'text') {
        newRow[colDef.key] = '';
      }
    });

    this.internalData.set([...this.internalData(), newRow]);
  }

  save(): void {
    this.data.set(JSON.parse(JSON.stringify(this.internalData())));
    this.launchRipple();
  }

  private initializeInternalData(): void {
    this.internalData.set(JSON.parse(JSON.stringify(this.data()))); // deep copy
  }

  private launchRipple(): void {
    const rippleRef = this.ripple?.launch({
      centered: true,
    });
  }
}
