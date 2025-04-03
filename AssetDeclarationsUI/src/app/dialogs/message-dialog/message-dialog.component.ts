import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MessageDialogData } from './message-dialog-data';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-message-dialog',
  imports: [MatDialogContent, MatDialogActions, MatButton],
  templateUrl: './message-dialog.component.html',
  styleUrl: './message-dialog.component.scss',
})
export class MessageDialogComponent {
  readonly dialogRef = inject(MatDialogRef<MessageDialogComponent>);
  readonly dialogData = inject<MessageDialogData>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }
}
