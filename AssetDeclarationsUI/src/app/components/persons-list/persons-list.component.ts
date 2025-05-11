import { Component, OnInit, signal } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { PersonListed } from '../../model/personListed.interface';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-persons-list',
  imports: [MatListModule],
  templateUrl: './persons-list.component.html',
  styleUrl: './persons-list.component.scss',
})
export class PersonsListComponent implements OnInit {
  totalCount = signal<number>(0);
  persons = signal<PersonListed[]>([]);
  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.personService
      .getCount()
      .subscribe((count) => this.totalCount.set(count));

    this.personService
      .getAllPaginated(0, 10)
      .subscribe((persons) => this.persons.set(persons));
  }
}
