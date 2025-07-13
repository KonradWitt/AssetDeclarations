import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesSelectorComponent } from './parties-selector.component';

describe('PartiesSelectorComponent', () => {
  let component: PartiesSelectorComponent;
  let fixture: ComponentFixture<PartiesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartiesSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartiesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
