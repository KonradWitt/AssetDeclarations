import { Component, computed, OnInit, signal } from '@angular/core';
import { Person } from '../../model/person.interface';
import { ActiveElement, Chart, ChartConfiguration, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RealEstateService } from '../../services/real-estate.service';
import { PersonRealEstateCount } from '../../model/personRealEstateCount.interface';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-real-estate-histogram',
  imports: [BaseChartDirective, MatInputModule, FormsModule],
  templateUrl: './real-estate-histogram.component.html',
  styleUrl: './real-estate-histogram.component.scss',
})
export class RealEstateHistogramComponent implements OnInit {
  minValue = signal<number>(100000);
  histogramData = signal<Map<number, Person[]>>(new Map<number, Person[]>());

  selectedPersons = signal<Person[]>([]);
  selectedRealEstateNumber = signal<number | undefined>(undefined);

  barChartData = computed(() => {
    if (!this.histogramData() || this.histogramData().size === 0) {
      return undefined;
    }

    return {
      labels: Array.from(this.histogramData().keys()).map((key) =>
        key.toString()
      ),
      datasets: [
        {
          data: Array.from(this.histogramData().values()).map((x) => x.length),
          label: 'Polityków',
        },
      ],
    } as ChartConfiguration<'bar'>['data'];
  });

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
        title: {
          display: true,
          text: `Posiadane nieruchomości`,
          font: { size: 20 },
        },
        ticks: {
          font: { size: 16 },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Liczba polityków',
          font: { size: 20 },
        },
        min: 0,
        ticks: {
          font: { size: 16 },
        },
      },
    },
    onClick: (event, elements, chart) =>
      this.onChartClicked(event, elements, chart),
  };

  constructor(private realEstateService: RealEstateService) {}

  ngOnInit(): void {
    this.realEstateService
      .getCountPerPerson(this.minValue())
      .subscribe((result) => {
        this.updateHistogram(result);
      });
  }

  updateMinValue(newValue: number) {
    this.minValue.set(newValue);
    this.realEstateService
      .getCountPerPerson(this.minValue())
      .subscribe((result) => {
        this.updateHistogram(result);
      });
  }

  private updateHistogram(persons: PersonRealEstateCount[]): void {
    const histogram = new Map<number, Person[]>();

    for (const person of persons) {
      if (person === undefined) {
        continue;
      }

      const numberOfRealEstate = person.realEstateCount;
      const personsGroup = histogram.get(numberOfRealEstate);
      if (personsGroup) {
        personsGroup.push(person.person);
      } else {
        histogram.set(numberOfRealEstate, [person.person]);
      }
    }

    const fullHistogram = new Map<number, Person[]>();

    const numOfProperties = Array.from(histogram.keys());
    const maxNumOfProperties = Math.max(...numOfProperties);
    for (let i = 0; i <= maxNumOfProperties; i++) {
      fullHistogram.set(i, histogram.get(i) ?? []);
    }

    this.histogramData.set(fullHistogram);
  }

  private onChartClicked(
    event: ChartEvent,
    elements: ActiveElement[],
    chart: Chart
  ): void {
    if (!elements || elements.length < 1) return;

    const selectedBar = elements[0].index;
    this.selectedRealEstateNumber.set(
      Array.from(this.histogramData().keys())[selectedBar]
    );

    this.selectedPersons.set(
      this.histogramData().get(this.selectedRealEstateNumber()!) ?? []
    );

    const datasetIndex = elements[0].datasetIndex;
    const dataIndex = elements[0].index;

    const dataset = chart.data.datasets[datasetIndex];

    const highlightColor = '#333';
    const defaultColor = Chart.defaults.backgroundColor.toString();

    if (!Array.isArray(dataset.backgroundColor)) {
      const originalColor = dataset.backgroundColor as string;
      dataset.backgroundColor = new Array(dataset.data.length).fill(
        originalColor
      );
    }

    dataset.backgroundColor = dataset.backgroundColor.map(() => defaultColor);

    (dataset.backgroundColor as string[])[dataIndex] = highlightColor;

    chart.update();
  }
}
