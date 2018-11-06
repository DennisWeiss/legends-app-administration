import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiOverviewComponent } from './poi-overview.component';

describe('PoiOverviewComponent', () => {
  let component: PoiOverviewComponent;
  let fixture: ComponentFixture<PoiOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
