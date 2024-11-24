import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Person } from '../../model/person.type';

@Component({
  selector: 'app-add-person-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './add-person-dialog.component.html',
  styleUrl: './add-person-dialog.component.scss'
})
export class AddPersonDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddPersonDialogComponent>);
  readonly person = signal<Person>({ id: 0, name: '' });

  onNoButtonClick(): void {
    this.dialogRef.close();
  }
}
