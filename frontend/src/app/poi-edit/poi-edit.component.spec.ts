import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoiEditComponent } from './poi-edit.component';

describe('PoiEditComponent', () => {
  let component: PoiEditComponent;
  let fixture: ComponentFixture<PoiEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoiEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
