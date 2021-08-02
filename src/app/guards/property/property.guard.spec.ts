import { TestBed } from '@angular/core/testing';

import { PropertyGuard } from './property.guard';

describe('PropertyGuard', () => {
  let guard: PropertyGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PropertyGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
