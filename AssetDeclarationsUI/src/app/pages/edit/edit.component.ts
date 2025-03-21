import { Component, OnInit, signal } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../model/person.type';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PersonAutocompleteComponent } from '../../components/person-autocomplete/person-autocomplete.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPersonDialogComponent } from '../../dialogs/add-person-dialog/add-person-dialog.component';

@Component({
  selector: 'app-edit',
  imports: [
    MatListModule,
    MatButtonModule,
    MatIconModule,
    PersonAutocompleteComponent,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  constructor(
    private personService: PersonService,
    private dialogService: MatDialog
  ) {}

  persons = signal<Person[]>([]);
  selectedPerson = signal<Person | undefined>(undefined);

  ngOnInit(): void {
    this.loadPersons();
  }

  private loadPersons(): void {
    this.personService
      .getPersons()
      .subscribe((persons) => this.persons.set(persons));
  }

  onPersonSelected(selectedPerson: Person): void {
    this.selectedPerson.set(selectedPerson);
  }

  onAddButtonClick(): void {
    this.openDialog();
  }

  onEditButtonClick(): void {}
  onDeleteButtonClick(): void {
    // if (this.selectedPerson() !== undefined) {
    //   this.personService.deltePerson(this.selectedPerson()?.id!);
    //   this.loadPersons();
    // }
  }

  openDialog(): void {
    const dialogRef = this.dialogService.open(AddPersonDialogComponent, {
      restoreFocus: false,
    });

    // dialogRef.afterClosed().subscribe((person) => {
    //   if (person !== undefined) {
    //     this.personService.addPerson(person);
    //     this.loadPersons();
    //   }
    // });
  }
}
