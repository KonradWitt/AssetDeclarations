import { Component, inject, OnInit } from '@angular/core';
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
export class AiContentWarningDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AiContentWarningDialogComponent>);

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  close(): void {
    this.dialogRef.close();
  }
}
