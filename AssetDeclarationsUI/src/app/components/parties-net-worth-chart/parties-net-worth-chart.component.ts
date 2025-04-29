import { Component, OnInit, signal } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { PartyService } from '../../services/party.service';
import { Party } from '../../model/party.interface';
import { BaseChartDirective } from 'ng2-charts';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';

interface PartyNetWorth {
  party: Party;
  averageNetWorth: number;
}

@Component({
  selector: 'app-parties-net-worth-chart',
  imports: [BaseChartDirective, NumberSpacePipe],
  templateUrl: './parties-net-worth-chart.component.html',
  styleUrl: './parties-net-worth-chart.component.scss',
})
export class PartiesNetWorthChartComponent implements OnInit {
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
          font: { size: 14 },
        },
      },
      y: {
        ticks: {
          font: { size: 14 },
          callback: function (value) {
            const pipe = new NumberSpacePipe();
            return pipe.transform(value as number) + ' zł'; // Add your desired unit here
          },
        },
        min: 0,
      },
    },
  };

  constructor(private partyService: PartyService) {}

  ngOnInit(): void {
    this.partyService
      .getAvgNetWorthPerParty()
      .subscribe((response) => this.updateChart(response));
  }

  updateChart(parties: PartyNetWorth[]): void {
    const sortedParties = JSON.parse(JSON.stringify(parties)).sort(
      (a: PartyNetWorth, b: PartyNetWorth) =>
        b.averageNetWorth - a.averageNetWorth
    ) as PartyNetWorth[];

    this.barChartData.set({
      labels: sortedParties.map((p) => p.party?.name ?? ''),
      datasets: [
        {
          data: sortedParties.map((p) => p.averageNetWorth),
        },
      ],
    } as ChartConfiguration<'bar'>['data']);
  }
}
