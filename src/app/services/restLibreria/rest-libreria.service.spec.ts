import { TestBed } from '@angular/core/testing';

import { RestLibreriaService } from './rest-libreria.service';

describe('RestLibreriaService', () => {
  let service: RestLibreriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestLibreriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
