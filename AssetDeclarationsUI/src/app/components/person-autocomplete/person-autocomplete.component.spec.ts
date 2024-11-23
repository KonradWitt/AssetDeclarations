import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonAutocompleteComponent } from './person-autocomplete.component';

describe('PersonAutocompleteComponent', () => {
  let component: PersonAutocompleteComponent;
  let fixture: ComponentFixture<PersonAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
