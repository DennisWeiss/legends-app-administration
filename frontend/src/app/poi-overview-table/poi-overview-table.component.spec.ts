import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiOverviewTableComponent } from './poi-overview-table.component';

describe('PoiOverviewTableComponent', () => {
  let component: PoiOverviewTableComponent;
  let fixture: ComponentFixture<PoiOverviewTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiOverviewTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiOverviewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
