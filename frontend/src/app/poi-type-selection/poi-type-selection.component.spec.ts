import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiTypeSelectionComponent } from './poi-type-selection.component';

describe('PoiTypeSelectionComponent', () => {
  let component: PoiTypeSelectionComponent;
  let fixture: ComponentFixture<PoiTypeSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiTypeSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiTypeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
