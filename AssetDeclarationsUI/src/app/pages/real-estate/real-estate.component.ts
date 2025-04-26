import { Component, OnInit, signal } from '@angular/core';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { RealEstate } from '../../model/realEstate.interface';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { RealEstateService } from '../../services/real-estate.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PersonRealEstateCount } from '../../model/personRealEstateCount.interface';
import { RealEstateHistogramComponent } from '../../components/real-estate-histogram/real-estate-histogram.component';

@Component({
  selector: 'app-real-estate',
  imports: [
    MatDividerModule,
    MatTableModule,
    NumberSpacePipe,
    MatPaginatorModule,
    RealEstateHistogramComponent,
  ],
  templateUrl: './real-estate.component.html',
  styleUrl: './real-estate.component.scss',
})
export class RealEstateComponent implements OnInit {
  constructor(
    private realEstateService: RealEstateService,
    private router: Router
  ) {}
  topRealEstate = signal<RealEstate[]>([]);

  totalCount = signal<number | undefined>(undefined);

  topRealEstateColumns = ['description', 'value'];

  private persons = Array<PersonRealEstateCount>();

  ngOnInit(): void {
    this.realEstateService
      .getCount()
      .subscribe((count) => this.totalCount.set(count));

    this.realEstateService
      .getAllPaginated(0, 25)
      .subscribe((res) =>
        this.topRealEstate.set(res.map((re) => re.realEstate))
      );
  }

  onTopRealEstateClicked(realEstate: RealEstate) {
    if (realEstate && realEstate.owner) {
      this.router.navigate(['polityk', realEstate.owner.link], {
        state: { id: realEstate.owner.id },
      });
    }
  }

  onPaginatorChanged($event: PageEvent) {
    this.realEstateService
      .getAllPaginated($event.pageIndex, $event.pageSize)
      .subscribe((res) =>
        this.topRealEstate.set(res.map((re) => re.realEstate))
      );
  }
}
