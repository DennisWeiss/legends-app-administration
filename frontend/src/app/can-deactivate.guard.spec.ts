import { TestBed, async, inject } from '@angular/core/testing';

import { CanDeactivateGuard } from './shared/guards/can-deactivate.guard';

describe('CanDeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateGuard]
    });
  });

  it('should ...', inject([CanDeactivateGuard], (guard: CanDeactivateGuard) => {
    expect(guard).toBeTruthy();
  }));
});
