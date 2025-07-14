import {
  AfterViewInit,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { PartyService } from '../../services/party.service';
import { Party } from '../../model/party.interface';
import { BaseChartDirective } from 'ng2-charts';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { PartiesSelectorComponent } from '../parties-selector/parties-selector.component';
import { DisplayDeviceService } from '../../services/display-device.service';
import { MatExpansionModule } from '@angular/material/expansion';

interface PartyNetWorth {
  party: Party;
  averageNetWorth: number;
  medianNetWorth: number;
}

@Component({
  selector: 'app-parties-net-worth-chart',
  imports: [BaseChartDirective, NumberSpacePipe, PartiesSelectorComponent, MatExpansionModule],
  templateUrl: './parties-net-worth-chart.component.html',
  styleUrl: './parties-net-worth-chart.component.scss',
})
export class PartiesNetWorthChartComponent implements OnInit {
  displayDeviceService = inject(DisplayDeviceService);
  partiesNetWorths = signal<PartyNetWorth[] | undefined>(undefined);
  selectedPartiesIds = signal<number[]>([]);
  barChartData = computed<any>(() => {
    const filteredParties = this.partiesNetWorths()?.filter((party) =>
      this.selectedPartiesIds().includes(party.party.id)
    );

    const sortedParties =
      filteredParties?.sort(
        (a: PartyNetWorth, b: PartyNetWorth) =>
          b.averageNetWorth - a.averageNetWorth
      ) ?? [];

    return {
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
    } as ChartConfiguration<'bar'>['data'];
  });

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

  @ViewChild(BaseChartDirective) chartRef: BaseChartDirective | undefined;

  constructor(private partyService: PartyService) {
    effect(() => {
      if (this.barChartData()) {
        this.chartRef?.chart?.resize();
      }
    });
  }

  ngOnInit(): void {
    this.partyService
      .getAvgNetWorthPerParty()
      .subscribe((response) => this.partiesNetWorths.set(response));
  }

  filterParties($event: Party[]) {
    this.selectedPartiesIds.set($event.map((x) => x.id));
  }
}
