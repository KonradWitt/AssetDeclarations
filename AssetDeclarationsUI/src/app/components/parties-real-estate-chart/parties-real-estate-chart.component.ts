import {
  Component,
  computed,
  effect,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PartyService } from '../../services/party.service';
import { Party } from '../../model/party.interface';
import { FormsModule } from '@angular/forms';
import { PartiesSelectorComponent } from '../parties-selector/parties-selector.component';

interface PartyRealEstateCount {
  party: Party;
  averageRealEstateCount: number;
}

@Component({
  selector: 'app-parties-real-estate-chart',
  imports: [BaseChartDirective, FormsModule, PartiesSelectorComponent],
  templateUrl: './parties-real-estate-chart.component.html',
  styleUrl: './parties-real-estate-chart.component.scss',
})
export class PartiesRealEstateChartComponent implements OnInit {
  partiesRealEstate = signal<
    | {
        party: Party;
        averageRealEstateCount: number;
        medianRealEstateCount: number;
      }[]
    | undefined
  >(undefined);
  minValue = signal<number>(100000);
  selectedPartiesIds = signal<number[]>([]);
  barChartData = computed(() => {
    const filteredParties = this.partiesRealEstate()?.filter((party) =>
      this.selectedPartiesIds().includes(party.party.id)
    );

    const sortedParties =
      filteredParties?.sort(
        (a: PartyRealEstateCount, b: PartyRealEstateCount) =>
          b.averageRealEstateCount - a.averageRealEstateCount
      ) ?? [];

    return {
      labels: sortedParties.map(
        (p) => p.party?.abbreviation ?? p.party?.name ?? ''
      ),
      datasets: [
        {
          label: 'Średnia',

          data: sortedParties.map((p) => p.averageRealEstateCount),
        },
        {
          label: 'Mediana',
          data: sortedParties.map((p) => p.medianRealEstateCount),
          backgroundColor: 'rgb(255, 99, 132)',
        },
      ],
    };
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
        ticks: {
          font: { size: 16 },
        },
        min: 0,
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
    this.refreshRealEstateData();
  }

  private refreshRealEstateData(): void {
    this.partyService
      .getAvgRealEstateCountPerParty(this.minValue())
      .subscribe((response) => this.partiesRealEstate.set(response));
  }

  updateMinValue(newValue: number) {
    this.minValue.set(newValue);
    this.refreshRealEstateData();
  }

  filterParties($event: Party[]) {
    this.selectedPartiesIds.set($event.map((x) => x.id));
  }
}
