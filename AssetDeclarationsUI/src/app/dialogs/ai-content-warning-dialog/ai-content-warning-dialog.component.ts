import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-ai-content-warning-dialog',
  imports: [MatDialogContent, MatDialogActions, MatButton],
  templateUrl: './ai-content-warning-dialog.component.html',
  styleUrl: './ai-content-warning-dialog.component.scss',
})
export class AiContentWarningDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AiContentWarningDialogComponent>);

  close(): void {
    this.dialogRef.close();
  }
}
