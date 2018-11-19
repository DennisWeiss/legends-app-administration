import { TestBed } from '@angular/core/testing';

import { ContentFormService } from './content-form.service';

describe('ContentFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentFormService = TestBed.get(ContentFormService);
    expect(service).toBeTruthy();
  });
});
