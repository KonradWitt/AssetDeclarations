import { Component, OnInit, signal } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PartyService } from '../../services/party.service';
import { Party } from '../../model/party.interface';
import { FormsModule } from '@angular/forms';

interface PartyRealEstateCount {
  party: Party;
  averageRealEstateCount: number;
}

@Component({
  selector: 'app-parties-real-estate-chart',
  imports: [BaseChartDirective, FormsModule],
  templateUrl: './parties-real-estate-chart.component.html',
  styleUrl: './parties-real-estate-chart.component.scss',
})
export class PartiesRealEstateChartComponent implements OnInit {
  constructor(private partyService: PartyService) {}

  minValue = signal<number>(100000);
  barChartData = signal<any>(undefined);

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        ticks: {
          font: { size: 16 },
        },
      },
      y: {
        ticks: {
          font: { size: 16 },
        },
        min: 0,
      },
    },
  };

  ngOnInit(): void {
    this.refreshRealEstateData();
  }

  private refreshRealEstateData(): void {
    this.partyService
      .getAvgRealEstateCountPerParty(this.minValue())
      .subscribe((response) => this.updateChart(response));
  }

  updateChart(parties: PartyRealEstateCount[]): void {
    const sortedParties = JSON.parse(JSON.stringify(parties)).sort(
      (a: PartyRealEstateCount, b: PartyRealEstateCount) =>
        b.averageRealEstateCount - a.averageRealEstateCount
    ) as PartyRealEstateCount[];

    this.barChartData.set({
      labels: sortedParties.map((p) => p.party?.abbreviation ?? p.party?.name ?? ''),
      datasets: [
        {
          data: sortedParties.map((p) => p.averageRealEstateCount),
        },
      ],
    } as ChartConfiguration<'bar'>['data']);
  }

  updateMinValue(newValue: number) {
    this.minValue.set(newValue);
    this.refreshRealEstateData();
  }
}
