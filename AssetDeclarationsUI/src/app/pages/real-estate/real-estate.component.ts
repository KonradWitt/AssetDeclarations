import {
  Component,
  computed,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Person } from '../../model/person.interface';
import { BaseChartDirective } from 'ng2-charts';
import { ActiveElement, Chart, ChartConfiguration, ChartEvent } from 'chart.js';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { RealEstate } from '../../model/realEstate.interface';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { RealEstateService } from '../../services/real-estate.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-real-estate',
  imports: [
    BaseChartDirective,
    MatDividerModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    NumberSpacePipe,
    FormsModule,
    MatPaginatorModule,
  ],
  templateUrl: './real-estate.component.html',
  styleUrl: './real-estate.component.scss',
})
export class RealEstateComponent implements OnInit {
  constructor(
    private realEstateService: RealEstateService,
    private router: Router
  ) {}

  minValue = signal<number>(100000);

  topRealEstate = signal<RealEstate[]>([]);

  histogramData = signal<Map<number, Person[]>>(new Map<number, Person[]>());

  selectedPersons = signal<Person[]>([]);
  selectedRealEstateNumber = signal<number | undefined>(undefined);

  totalCount = signal<number | undefined>(undefined);

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
    responsive: true,
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
      },
      y: {
        title: {
          display: true,
          text: 'Liczba polityków',
          font: { size: 20 },
        },
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
    onClick: (event, elements, chart) =>
      this.onChartClicked(event, elements, chart),
  };

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

  topRealEstateColumns = ['description', 'value'];

  private persons = Array<Person>();

  ngOnInit(): void {
    this.realEstateService
      .getAllGroupedByPersons(this.minValue())
      .subscribe((result) => {
        this.persons = result;
        this.updateHistogram(this.persons, this.minValue());
      });

    this.realEstateService
      .getCount()
      .subscribe((count) => this.totalCount.set(count));

    this.realEstateService
      .getAllPaginated(0, 25)
      .subscribe((res) =>
        this.topRealEstate.set(res.map((re) => re.realEstate))
      );
  }

  updateMinValue(newValue: number) {
    this.minValue.set(newValue);
    this.updateHistogram(this.persons, this.minValue());
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

  private updateHistogram(persons: Person[], minValue: number): void {
    const filteredPersons = this.filterPersons(persons, minValue);

    const histogram = new Map<number, Person[]>();

    for (const person of filteredPersons) {
      if (person === undefined) {
        continue;
      }

      const numberOfRealEstate = person.realEstate?.length ?? 0;
      const personsGroup = histogram.get(numberOfRealEstate);
      if (personsGroup) {
        personsGroup.push(person);
      } else {
        histogram.set(numberOfRealEstate, [person]);
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

  private filterPersons(persons: Person[], minValue: number): Person[] {
    return persons.map((person) => {
      const filteredRealEstates =
        person.realEstate?.filter(
          (realEstate) => realEstate.value > minValue
        ) || [];

      return {
        ...person,
        realEstate: filteredRealEstates,
      };
    });
  }
}
