import { Component, OnInit, signal } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { Person } from '../../model/person.type';

@Component({
  selector: 'app-real-estate',
  imports: [],
  templateUrl: './real-estate.component.html',
  styleUrl: './real-estate.component.scss',
})
export class RealEstateComponent implements OnInit {
  constructor(private personService: PersonService) {}

  histogramData = signal<Map<number, number>>(new Map<number, number>());

  ngOnInit(): void {
    const persons = this.personService
      .getAllWithRealEstate()
      .subscribe((result) => {
        console.log(result);
        this.updateHistogram(result);
        console.log(this.histogramData());
      });
  }

  private updateHistogram(persons: Person[]): void {
    const histogram = new Map<number, number>();

    for (const person of persons) {
      if (!person?.assetDeclarations?.[0]) {
        continue;
      }

      const numberOfRealEstate = person.assetDeclarations[0].realEstate.length;

      histogram.set(
        numberOfRealEstate,
        (histogram.get(numberOfRealEstate) || 0) + 1
      );
    }

    this.histogramData.set(histogram);
  }
}
