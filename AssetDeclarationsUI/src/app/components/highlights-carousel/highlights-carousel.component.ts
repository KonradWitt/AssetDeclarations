import {
  Component,
  computed,
  inject,
  OnInit,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { PersonService } from '../../services/person.service';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { PersonHighlight } from '../../model/personHighlight.interface';
import { HostListener } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'highlights-carousel',
  imports: [Carousel, CarouselModule, NumberSpacePipe, MatProgressSpinnerModule],
  templateUrl: './highlights-carousel.component.html',
  styleUrl: './highlights-carousel.component.scss',
})
export class HighlightsCarouselComponent implements OnInit {
  private readonly personService = inject(PersonService);

  persons = signal<PersonHighlight[] | undefined>(undefined);
  carouselPersons = computed(() => Array(100).fill(this.persons()).flat());
  personClicked = output<PersonHighlight>();

  windowWidth = signal<number>(0);
  numVisible = computed(() => {
    return Math.floor(this.windowWidth() / 350);
  });

  numScroll = computed(() => {
    if (this.numVisible() <= 3) return 1;
    else return 2;
  });

  constructor() {}

  ngOnInit(): void {
    this.personService.getHighlightsPersons().subscribe((persons) => {
      this.persons.set(persons);
    });

    this.windowWidth.set(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    this.windowWidth.set((event.target as Window).innerWidth);
  }

  onPersonClicked(personHighlight: PersonHighlight): void {
    this.personClicked.emit(personHighlight);
  }
}
