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
import { RealEstateTableComponent } from "../../components/real-estate-table/real-estate-table.component";

@Component({
  selector: 'app-real-estate',
  imports: [MatDividerModule, RealEstateHistogramComponent, RealEstateTableComponent],
  templateUrl: './real-estate.component.html',
  styleUrl: './real-estate.component.scss',
})
export class RealEstateComponent {
  constructor() {}
}
