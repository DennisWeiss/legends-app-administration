import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseSnackbarComponent } from './response-snackbar.component';

describe('ResponseSnackbarComponent', () => {
  let component: ResponseSnackbarComponent;
  let fixture: ComponentFixture<ResponseSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
