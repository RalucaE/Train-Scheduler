import { TestBed } from '@angular/core/testing';

import { TrainRoutesService } from './train-routes.service';

describe('TrainRoutesService', () => {
  let service: TrainRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
