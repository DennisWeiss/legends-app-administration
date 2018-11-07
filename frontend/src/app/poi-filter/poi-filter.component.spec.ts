import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiFilterComponent } from './poi-filter.component';

describe('PoiFilterComponent', () => {
  let component: PoiFilterComponent;
  let fixture: ComponentFixture<PoiFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
