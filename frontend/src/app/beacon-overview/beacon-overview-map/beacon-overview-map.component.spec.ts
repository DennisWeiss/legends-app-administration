import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconOverviewMapComponent } from './beacon-overview-map.component';

describe('BeaconOverviewMapComponent', () => {
  let component: BeaconOverviewMapComponent;
  let fixture: ComponentFixture<BeaconOverviewMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconOverviewMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconOverviewMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
