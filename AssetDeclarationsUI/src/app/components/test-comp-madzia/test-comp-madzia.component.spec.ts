import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCompMadziaComponent } from './test-comp-madzia.component';

describe('TestCompMadziaComponent', () => {
  let component: TestCompMadziaComponent;
  let fixture: ComponentFixture<TestCompMadziaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCompMadziaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCompMadziaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
