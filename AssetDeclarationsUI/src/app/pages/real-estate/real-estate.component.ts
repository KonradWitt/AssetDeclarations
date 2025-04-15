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
import { ChartConfiguration } from 'chart.js';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { RealEstate } from '../../model/realEstate.type';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-real-estate',
  imports: [
    BaseChartDirective,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    NumberSpacePipe,
  ],
  templateUrl: './real-estate.component.html',
  styleUrl: './real-estate.component.scss',
})
export class RealEstateComponent implements OnInit {
  constructor(private personService: PersonService, private router: Router) {}

  minValue = signal<number>(100000);

  topRealEstate = signal<RealEstate[]>([]);

  histogramData = signal<Map<number, number>>(new Map<number, number>());

  barChartData = computed(() => {
    if (!this.histogramData() || this.histogramData().size === 0) {
      return undefined;
    }

    return {
      labels: Array.from(this.histogramData().keys()).map((key) =>
        key.toString()
      ),
      datasets: [
        { data: Array.from(this.histogramData().values()), label: 'Polityków' },
      ],
    } as ChartConfiguration<'bar'>['data'];
  });

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
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
  };

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
    console.log(this.topRealEstate());
  }

  updateMinValue($event: Event) {
    const input = ($event.target as HTMLInputElement).value;
    const newValue = parseInt(input);
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

    const histogram = new Map<number, number>();

    for (const person of filteredPersons) {
      if (person === undefined) {
        continue;
      }

      const numberOfRealEstate = person.realEstate?.length ?? 0;

      histogram.set(
        numberOfRealEstate,
        (histogram.get(numberOfRealEstate) || 0) + 1
      );
    }

    const sortedHistogram = new Map(
      [...histogram.entries()].sort((a, b) => a[0] - b[0])
    );

    this.histogramData.set(sortedHistogram);
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
