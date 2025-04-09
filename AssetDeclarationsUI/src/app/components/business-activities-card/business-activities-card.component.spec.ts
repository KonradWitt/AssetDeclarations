import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessActivitiesCardComponent } from './business-activities-card.component';

describe('BusinessActivitiesCardComponent', () => {
  let component: BusinessActivitiesCardComponent;
  let fixture: ComponentFixture<BusinessActivitiesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessActivitiesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessActivitiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
