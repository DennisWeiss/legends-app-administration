import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconOverviewMapInfoWindowComponent } from './beacon-overview-map-info-window.component';

describe('BeaconOverviewMapInfoWindowComponent', () => {
  let component: BeaconOverviewMapInfoWindowComponent;
  let fixture: ComponentFixture<BeaconOverviewMapInfoWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconOverviewMapInfoWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconOverviewMapInfoWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
