import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiContentWarningDialogComponent } from './ai-content-warning-dialog.component';

describe('AiContentWarningDialogComponent', () => {
  let component: AiContentWarningDialogComponent;
  let fixture: ComponentFixture<AiContentWarningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiContentWarningDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiContentWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
