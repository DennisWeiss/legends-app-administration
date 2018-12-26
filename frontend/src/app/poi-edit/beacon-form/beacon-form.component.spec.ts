import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeaconFormComponent } from './beacon-form.component';

describe('BeaconFormComponent', () => {
  let component: BeaconFormComponent;
  let fixture: ComponentFixture<BeaconFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeaconFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeaconFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
