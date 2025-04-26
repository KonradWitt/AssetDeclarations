import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateHistogramComponent } from './real-estate-histogram.component';

describe('RealEstateHistogramComponent', () => {
  let component: RealEstateHistogramComponent;
  let fixture: ComponentFixture<RealEstateHistogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealEstateHistogramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealEstateHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
