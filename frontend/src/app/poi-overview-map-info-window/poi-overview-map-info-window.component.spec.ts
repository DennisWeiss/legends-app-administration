import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiOverviewMapInfoWindowComponent } from './poi-overview-map-info-window.component';

describe('PoiOverviewMapInfoWindowComponent', () => {
  let component: PoiOverviewMapInfoWindowComponent;
  let fixture: ComponentFixture<PoiOverviewMapInfoWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiOverviewMapInfoWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiOverviewMapInfoWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
