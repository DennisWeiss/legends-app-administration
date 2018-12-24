import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiTypeTagComponent } from './poi-type-tag.component';

describe('PoiTypeTagComponent', () => {
  let component: PoiTypeTagComponent;
  let fixture: ComponentFixture<PoiTypeTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiTypeTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiTypeTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
