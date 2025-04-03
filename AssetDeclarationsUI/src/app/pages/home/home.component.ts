import { Component, OnInit, signal } from '@angular/core';
import { PersonAutocompleteComponent } from '../../components/person-autocomplete/person-autocomplete.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Person } from '../../model/person.type';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { HighlightsCarouselComponent } from '../../components/highlights-carousel/highlights-carousel.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MessageDialogComponent } from '../../dialogs/message-dialog/message-dialog.component';
import { AiContentWarningDialogComponent } from '../../dialogs/ai-content-warning-dialog/ai-content-warning-dialog.component';

@Component({
  selector: 'app-home',
  imports: [
    PersonAutocompleteComponent,
    MatCardModule,
    MatGridListModule,
    CommonModule,
    MatProgressSpinnerModule,
    HighlightsCarouselComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  selectedPerson = signal<Person | undefined>(undefined);
  isLoading = signal<boolean>(false);

  constructor(private dialogService: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.dialogService.open(AiContentWarningDialogComponent);
  }

  onPersonSelected($event: Person) {
    this.router.navigate(['polityk', $event.link], {
      state: { id: $event.id },
    });
  }
}
