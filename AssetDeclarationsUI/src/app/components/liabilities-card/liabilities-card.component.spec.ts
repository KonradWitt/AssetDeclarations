import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiabilitiesCardComponent } from './liabilities-card.component';

describe('LiabilitiesCardComponent', () => {
  let component: LiabilitiesCardComponent;
  let fixture: ComponentFixture<LiabilitiesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiabilitiesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiabilitiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
