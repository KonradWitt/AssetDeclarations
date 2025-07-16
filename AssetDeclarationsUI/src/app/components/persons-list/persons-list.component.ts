import { Component, OnInit, signal } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { PersonListed } from '../../model/personListed.interface';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatSortModule, Sort } from '@angular/material/sort';
import {
  PersonSortDirection,
  PersonSortKey,
} from '../../model/personSort.enum';
import { PartiesSelectorComponent } from '../parties-selector/parties-selector.component';
import { Party } from '../../model/party.interface';

@Component({
  selector: 'app-persons-list',
  imports: [
    MatListModule,
    MatTableModule,
    NumberSpacePipe,
    MatPaginatorModule,
    NgxSkeletonLoaderModule,
    MatSortModule,
    PartiesSelectorComponent,
  ],
  templateUrl: './persons-list.component.html',
  styleUrl: './persons-list.component.scss',
})
export class PersonsListComponent implements OnInit {
  totalCount = signal<number>(100);
  persons = signal<PersonListed[] | undefined>(undefined);
  isLoading = signal<boolean>(false);
  pageIndex: number = 0;
  pageSize: number = 10;
  sortKey: PersonSortKey | null = null;
  sortDirection: PersonSortDirection | null = null;
  selectedParties: Party[] = [];

  constructor(private personService: PersonService, private router: Router) {}

  ngOnInit(): void {
    this._loadData();
  }

  navigateToPerson(clickedPerson: PersonListed) {
    this.router.navigate(['polityk', clickedPerson.link]);
  }

  updatePagination(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this._loadData();
  }

  updateSort(sort: Sort) {
    const sortEnums = this._getSortingEnumsFromSortEvent(sort);
    this.sortKey = sortEnums.sortKey;
    this.sortDirection = sortEnums.sortDirection;

    this._loadData();
  }

  updateSelectedParties(selectedParties: Party[]) {
    this.selectedParties = selectedParties;
    this._loadData();
  }

  private _loadData() {
    this.isLoading.set(true);
    this.personService
      .getListPaginated(
        this.selectedParties.map((p) => p.id),
        this.pageIndex,
        this.pageSize,
        this.sortKey,
        this.sortDirection
      )
      .subscribe((persons) => {
        this.persons.set(persons);
        this.isLoading.set(false);
      });
  }

  private _getSortingEnumsFromSortEvent(sort: Sort): {
    sortKey: PersonSortKey | null;
    sortDirection: PersonSortDirection | null;
  } {
    if (sort.direction === '') {
      return {
        sortKey: null,
        sortDirection: null,
      };
    }

    let sortKey: PersonSortKey | null = null;
    let sortDirection: PersonSortDirection | null = null;

    if (sort.active === 'person') {
      sortKey = PersonSortKey.LastName;
    } else if (sort.active === 'netWorth') {
      sortKey = PersonSortKey.NetWorth;
    }

    if (sort.direction === 'asc') {
      sortDirection = PersonSortDirection.Asc;
    } else if (sort.direction === 'desc') {
      sortDirection = PersonSortDirection.Desc;
    }

    return {
      sortKey: sortKey,
      sortDirection: sortDirection,
    };
  }
}
