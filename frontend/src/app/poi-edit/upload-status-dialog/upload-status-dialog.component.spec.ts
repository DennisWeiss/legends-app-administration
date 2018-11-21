import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStatusDialogComponent } from './upload-status-dialog.component';

describe('UploadStatusDialogComponent', () => {
  let component: UploadStatusDialogComponent;
  let fixture: ComponentFixture<UploadStatusDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadStatusDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
