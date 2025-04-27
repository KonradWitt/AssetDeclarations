import { Component, OnInit, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RealEstateService } from '../../services/real-estate.service';
import { Router } from '@angular/router';
import { RealEstate } from '../../model/realEstate.interface';
import { PersonRealEstateCount } from '../../model/personRealEstateCount.interface';
import { Person } from '../../model/person.interface';

@Component({
  selector: 'app-real-estate-table',
  imports: [MatTableModule, NumberSpacePipe, MatPaginatorModule],
  templateUrl: './real-estate-table.component.html',
  styleUrl: './real-estate-table.component.scss',
})
export class RealEstateTableComponent implements OnInit {
  constructor(
    private realEstateService: RealEstateService,
    private router: Router
  ) {}

  topRealEstate = signal<{ person: Person; realEstate: RealEstate }[]>([]);

  totalCount = signal<number | undefined>(undefined);

  ngOnInit(): void {
    this.realEstateService
      .getCount()
      .subscribe((count) => this.totalCount.set(count));

    this.realEstateService
      .getAllPaginated(0, 25)
      .subscribe((result) => this.topRealEstate.set(result));
  }

  onRowClicked(row: { person: Person; realEstate: RealEstate }) {
    this.router.navigate(['polityk', row.person.link], {
      state: { id: row.person.id },
    });
  }

  onPaginatorChanged($event: PageEvent) {
    this.realEstateService
      .getAllPaginated($event.pageIndex, $event.pageSize)
      .subscribe((result) => this.topRealEstate.set(result));
  }
}
