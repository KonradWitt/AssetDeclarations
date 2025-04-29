import { Component, computed, OnInit, signal } from '@angular/core';
import { PartyService } from '../../services/party.service';
import { BaseChartDirective } from 'ng2-charts';
import { Party } from '../../model/party.interface';
import { ChartConfiguration } from 'chart.js';
import { PartiesRealEstateChartComponent } from "../../components/parties-real-estate-chart/parties-real-estate-chart.component";
import { PartiesNetWorthChartComponent } from "../../components/parties-net-worth-chart/parties-net-worth-chart.component";


@Component({
  selector: 'app-parties',
  imports: [PartiesRealEstateChartComponent, PartiesNetWorthChartComponent],
  templateUrl: './parties.component.html',
  styleUrl: './parties.component.scss',
})
export class PartiesComponent {



}
