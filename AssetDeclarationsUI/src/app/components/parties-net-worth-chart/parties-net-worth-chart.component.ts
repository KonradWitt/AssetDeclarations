import { Component, OnInit, signal } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { PartyService } from '../../services/party.service';
import { Party } from '../../model/party.interface';
import { BaseChartDirective } from 'ng2-charts';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';

interface PartyNetWorth {
  party: Party;
  averageNetWorth: number;
  medianNetWorth: number;
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
      legend: { display: true, labels: { font: { size: 16 } } },
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
        min: 0,
        ticks: {
          font: { size: 16 },
          callback: function (value) {
            const pipe = new NumberSpacePipe();
            return pipe.transform(value as number) + ' zł';
          },
        },
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
      labels: sortedParties.map(
        (p) => p.party?.abbreviation ?? p.party?.name ?? ''
      ),
      datasets: [
        {
          label: 'Średnia',
          data: sortedParties.map((p) => p.averageNetWorth),
          //default chart color
        },
        {
          label: 'Mediana',
          data: sortedParties.map((p) => p.medianNetWorth),
          backgroundColor: 'rgb(255, 99, 132)',
        },
      ],
    } as ChartConfiguration<'bar'>['data']);
  }
}
