import { Component, inject, OnInit, output, signal } from '@angular/core';
import { Carousel } from 'primeng/carousel';
import { Person } from '../../model/person.type';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'highlights-carousel',
  imports: [Carousel],
  templateUrl: './highlights-carousel.component.html',
  styleUrl: './highlights-carousel.component.scss',
})
export class HighlightsCarouselComponent implements OnInit {
  private readonly personService = inject(PersonService);

  persons = signal<Person[] | undefined>(undefined);
  personClicked = output<Person>();

  constructor() {}

  ngOnInit(): void {
    this.personService.getHighlightsPersons().subscribe((persons) => {
      this.persons.set(persons);
    });
  }

  onPersonClicked(person: Person) {
    this.personClicked.emit(person);
  }
}
