import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeaconDialogComponent } from './add-beacon-dialog.component';

describe('AddBeaconDialogComponent', () => {
  let component: AddBeaconDialogComponent;
  let fixture: ComponentFixture<AddBeaconDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBeaconDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBeaconDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
