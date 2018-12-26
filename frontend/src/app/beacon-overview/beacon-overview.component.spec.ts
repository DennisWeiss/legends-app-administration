import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconOverviewComponent } from './beacon-overview.component';

describe('BeaconOverviewComponent', () => {
  let component: BeaconOverviewComponent;
  let fixture: ComponentFixture<BeaconOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
