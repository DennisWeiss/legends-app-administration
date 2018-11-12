import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPreviewMultipleComponent } from './img-preview-multiple.component';

describe('ImgPreviewMultipleComponent', () => {
  let component: ImgPreviewMultipleComponent;
  let fixture: ComponentFixture<ImgPreviewMultipleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgPreviewMultipleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgPreviewMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
