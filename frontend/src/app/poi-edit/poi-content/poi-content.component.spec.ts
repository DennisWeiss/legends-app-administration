import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiContentComponent } from './poi-content.component';

describe('PoiContentComponent', () => {
  let component: PoiContentComponent;
  let fixture: ComponentFixture<PoiContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
