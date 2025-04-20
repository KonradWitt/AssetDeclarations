import { TestBed } from '@angular/core/testing';

import { AssetDeclarationServiceService } from './asset-declaration-service.service';

describe('AssetDeclarationServiceService', () => {
  let service: AssetDeclarationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssetDeclarationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
