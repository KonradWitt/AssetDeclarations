import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPropertiesCardComponent } from './personal-properties-card.component';

describe('PersonalPropertiesCardComponent', () => {
  let component: PersonalPropertiesCardComponent;
  let fixture: ComponentFixture<PersonalPropertiesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalPropertiesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalPropertiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
