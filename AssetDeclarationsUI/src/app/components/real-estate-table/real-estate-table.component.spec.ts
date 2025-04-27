import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateTableComponent } from './real-estate-table.component';

describe('RealEstateTableComponent', () => {
  let component: RealEstateTableComponent;
  let fixture: ComponentFixture<RealEstateTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealEstateTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealEstateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
