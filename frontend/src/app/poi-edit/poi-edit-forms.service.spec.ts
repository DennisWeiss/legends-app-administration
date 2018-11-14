import { TestBed } from '@angular/core/testing';

import { PoiEditFormsService } from './poi-edit-forms.service';

describe('PoiEditFormsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoiEditFormsService = TestBed.get(PoiEditFormsService);
    expect(service).toBeTruthy();
  });
});
