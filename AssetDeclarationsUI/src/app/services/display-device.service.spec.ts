import { TestBed } from '@angular/core/testing';

import { DisplayDeviceService } from './display-device.service';

describe('DisplayDeviceService', () => {
  let service: DisplayDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
