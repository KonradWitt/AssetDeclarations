import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesNetWorthChartComponent } from './parties-net-worth-chart.component';

describe('PartiesNetWorthChartComponent', () => {
  let component: PartiesNetWorthChartComponent;
  let fixture: ComponentFixture<PartiesNetWorthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartiesNetWorthChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartiesNetWorthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
