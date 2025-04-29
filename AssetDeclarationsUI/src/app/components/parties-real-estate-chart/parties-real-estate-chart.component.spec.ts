import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesRealEstateChartComponent } from './parties-real-estate-chart.component';

describe('PartiesRealEstateChartComponent', () => {
  let component: PartiesRealEstateChartComponent;
  let fixture: ComponentFixture<PartiesRealEstateChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartiesRealEstateChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartiesRealEstateChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
