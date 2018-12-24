import {TestBed} from '@angular/core/testing'

import {PoiService} from './shared/services/poi.service'

describe('PoiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: PoiService = TestBed.get(PoiService)
    expect(service).toBeTruthy()
  })
})
