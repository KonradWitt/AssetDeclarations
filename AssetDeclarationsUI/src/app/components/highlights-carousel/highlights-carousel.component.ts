import {
  AfterViewInit,
  Component,
  computed,
  inject,
  OnInit,
  output,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { Person } from '../../model/person.type';
import { PersonService } from '../../services/person.service';
import { delay } from 'rxjs';

@Component({
  selector: 'highlights-carousel',
  imports: [Carousel, CarouselModule],
  templateUrl: './highlights-carousel.component.html',
  styleUrl: './highlights-carousel.component.scss',
})
export class HighlightsCarouselComponent implements OnInit {
  private readonly personService = inject(PersonService);

  persons = signal<Person[] | undefined>([]);
  carouselPersons = computed(() => Array(100).fill(this.persons()).flat());
  personClicked = output<Person>();
  @ViewChild('carousel') carousel!: Carousel;

  constructor() {}

  ngOnInit(): void {
    this.personService.getHighlightsPersons().subscribe((persons) => {
      this.persons.set(persons);
    });
  }

  onPersonClicked(person: Person): void {
    this.personClicked.emit(person);
  }
}
