import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssetDeclarationComponent } from './edit-asset-declaration.component';

describe('EditAssetDeclarationComponent', () => {
  let component: EditAssetDeclarationComponent;
  let fixture: ComponentFixture<EditAssetDeclarationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAssetDeclarationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAssetDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
