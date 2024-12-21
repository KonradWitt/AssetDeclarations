import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetWorthTrendCardComponent } from './net-worth-trend-card.component';

describe('NetWorthTrendCardComponent', () => {
  let component: NetWorthTrendCardComponent;
  let fixture: ComponentFixture<NetWorthTrendCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NetWorthTrendCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetWorthTrendCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
