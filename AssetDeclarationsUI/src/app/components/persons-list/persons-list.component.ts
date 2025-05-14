import { Component, OnInit, signal } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { PersonListed } from '../../model/personListed.interface';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@Component({
  selector: 'app-persons-list',
  imports: [MatListModule, MatTableModule, NumberSpacePipe, MatPaginatorModule, NgxSkeletonLoaderModule],
  templateUrl: './persons-list.component.html',
  styleUrl: './persons-list.component.scss',
})
export class PersonsListComponent implements OnInit {
  totalCount = signal<number>(0);
  persons = signal<PersonListed[] | undefined>(undefined);

  constructor(private personService: PersonService, private router: Router) {}

  ngOnInit(): void {
    this.personService
      .getCount()
      .subscribe((count) => this.totalCount.set(count));

    this.personService
      .getAllPaginated(0, 10)
      .subscribe((persons) => this.persons.set(persons));
  }

  onRowClicked(clickedPerson: PersonListed) {
    this.router.navigate(['polityk', clickedPerson.link]);
  }

  onPaginatorChanged(pageEvent: PageEvent) {
    this.personService
      .getAllPaginated(pageEvent.pageIndex, pageEvent.pageSize)
      .subscribe((persons) => this.persons.set(persons));
  }
}
