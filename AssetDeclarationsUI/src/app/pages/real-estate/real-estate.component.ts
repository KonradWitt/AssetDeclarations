import {
  Component,
  computed,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../model/person.type';
import { BaseChartDirective } from 'ng2-charts';
import {
  ActiveElement,
  BubbleDataPoint,
  Chart,
  ChartConfiguration,
  ChartEvent,
  ChartTypeRegistry,
  Point,
} from 'chart.js';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { RealEstate } from '../../model/realEstate.type';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

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
    FormsModule 
  ],
  templateUrl: './real-estate.component.html',
  styleUrl: './real-estate.component.scss',
})
export class RealEstateComponent implements OnInit {
  constructor(private personService: PersonService, private router: Router) {}

  minValue = signal<number>(100000);

  topRealEstate = signal<RealEstate[]>([]);

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

  topRealEstateColumns = ['owner', 'description', 'value'];

  private persons = Array<Person>();

  ngOnInit(): void {
    this.personService
      .getAllWithRealEstate(this.minValue())
      .subscribe((result) => {
        this.persons = result;
        this.updateHistogram(this.persons, this.minValue());
        this.updateTopRealEstate(this.persons);
      });
  }

  private updateTopRealEstate(persons: Person[]): void {
    const filteredRealEstates = persons
      .flatMap((person) =>
        (person.realEstate ?? [])
          .filter((r) => r != undefined)
          .map((r) => ({ ...r, owner: person }))
      )
      .sort((a, b) => {
        return (b?.value ?? 0) - (a?.value ?? 0);
      })
      .slice(0, 10);

    this.topRealEstate.set(filteredRealEstates);
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
