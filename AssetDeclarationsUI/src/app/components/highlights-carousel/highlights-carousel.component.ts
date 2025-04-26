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
import { Person } from '../../model/person.interface';
import { PersonService } from '../../services/person.service';
import { delay } from 'rxjs';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { PersonHighlight } from '../../model/personHighlight.interface';

@Component({
  selector: 'highlights-carousel',
  imports: [Carousel, CarouselModule, NumberSpacePipe],
  templateUrl: './highlights-carousel.component.html',
  styleUrl: './highlights-carousel.component.scss',
})
export class HighlightsCarouselComponent implements OnInit {
  private readonly personService = inject(PersonService);

  persons = signal<PersonHighlight[] | undefined>([]);
  carouselPersons = computed(() => Array(100).fill(this.persons()).flat());
  personClicked = output<PersonHighlight>();
  @ViewChild('carousel') carousel!: Carousel;

  constructor() {}

  ngOnInit(): void {
    this.personService.getHighlightsPersons().subscribe((persons) => {
      this.persons.set(persons);
    });
  }

  onPersonClicked(personHighlight: PersonHighlight): void {
    this.personClicked.emit(personHighlight);
  }
}
