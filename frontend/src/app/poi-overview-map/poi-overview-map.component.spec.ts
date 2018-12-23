import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiOverviewMapComponent } from './poi-overview-map.component';

describe('PoiOverviewMapComponent', () => {
  let component: PoiOverviewMapComponent;
  let fixture: ComponentFixture<PoiOverviewMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiOverviewMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiOverviewMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
