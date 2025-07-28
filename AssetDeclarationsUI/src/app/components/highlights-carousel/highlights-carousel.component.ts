import {
  Component,
  computed,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { Carousel, CarouselModule } from 'primeng/carousel';
import { PersonService } from '../../services/person.service';
import { NumberSpacePipe } from '../../pipes/numberSpace.pipe';
import { PersonHighlight } from '../../model/personHighlight.interface';
import { HostListener } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'highlights-carousel',
  imports: [
    Carousel,
    CarouselModule,
    NumberSpacePipe,
    MatProgressSpinnerModule,
    NgxSkeletonLoaderModule,
  ],
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
    return Math.floor(this.windowWidth() / 300);
  });

  numScroll = computed(() => {
    if (this.numVisible() <= 3) return 1;
    else return 2;
  });

  constructor() {}

  ngOnInit(): void {
    this.windowWidth.set(window.innerWidth);
    this.personService.getHighlightsPersons().subscribe((persons) => {
      const shuffled = persons.sort(() => Math.random() - 0.5);
      this.persons.set(shuffled);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    this.windowWidth.set((event.target as Window).innerWidth);
  }

  onPersonClicked(personHighlight: PersonHighlight): void {
    this.personClicked.emit(personHighlight);
  }
}
