import { TestBed } from '@angular/core/testing';

import { SharedRouteService } from './shared-route.service';

describe('SharedRouteService', () => {
  let service: SharedRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
