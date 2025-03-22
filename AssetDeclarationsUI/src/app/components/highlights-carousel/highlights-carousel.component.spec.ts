import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightsCarouselComponent } from './highlights-carousel.component';

describe('HighlightsCarouselComponent', () => {
  let component: HighlightsCarouselComponent;
  let fixture: ComponentFixture<HighlightsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightsCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlightsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
