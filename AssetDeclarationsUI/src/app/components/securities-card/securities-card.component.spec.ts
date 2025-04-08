import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecuritiesCardComponent } from './securities-card.component';

describe('SecuritiesCardComponent', () => {
  let component: SecuritiesCardComponent;
  let fixture: ComponentFixture<SecuritiesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecuritiesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecuritiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
