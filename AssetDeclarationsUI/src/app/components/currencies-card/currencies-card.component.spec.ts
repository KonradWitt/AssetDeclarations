import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesCardComponent } from './currencies-card.component';

describe('CurrenciesCardComponent', () => {
  let component: CurrenciesCardComponent;
  let fixture: ComponentFixture<CurrenciesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrenciesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrenciesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
