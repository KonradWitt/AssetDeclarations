import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivablesCardComponent } from './receivables-card.component';

describe('ReceivablesCardComponent', () => {
  let component: ReceivablesCardComponent;
  let fixture: ComponentFixture<ReceivablesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceivablesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivablesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
