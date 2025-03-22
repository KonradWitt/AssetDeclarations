import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarationsCardComponent } from './declarations-card.component';

describe('DeclarationsCardComponent', () => {
  let component: DeclarationsCardComponent;
  let fixture: ComponentFixture<DeclarationsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeclarationsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclarationsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
