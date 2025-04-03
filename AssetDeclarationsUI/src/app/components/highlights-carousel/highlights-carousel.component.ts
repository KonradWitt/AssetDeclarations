import { Component } from '@angular/core';
import { Carousel } from 'primeng/carousel';

interface highlightPerson {
  name: string;
  img: string;
}

@Component({
  selector: 'highlights-carousel',
  imports: [Carousel],
  templateUrl: './highlights-carousel.component.html',
  styleUrl: './highlights-carousel.component.scss',
})
export class HighlightsCarouselComponent {
  persons: highlightPerson[] = [
    {
      name: 'Adrian Zandberg',
      img: 'assets/images/adrian-zandberg.jpg',
    },
    {
      name: 'Donald Tusk',
      img: 'assets/images/donald-tusk.jpg',
    },
    {
      name: 'Sławomir Mentzen',
      img: 'assets/images/slawomir-mentzen.jpg',
    },
    {
      name: 'Jarosław Kaczyński',
      img: 'assets/images/jaroslaw-kaczynski.png',
    },
    {
      name: 'Grzegorz Braun',
      img: 'assets/images/grzegorz-braun.jpg',
    },
    {
      name: 'Szymon Hołownia',
      img: 'assets/images/szymon-holownia.jpg',
    },
  ];

  constructor() {}
}
