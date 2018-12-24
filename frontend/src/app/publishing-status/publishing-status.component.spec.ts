import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishingStatusComponent } from './publishing-status.component';

describe('PublishingStatusComponent', () => {
  let component: PublishingStatusComponent;
  let fixture: ComponentFixture<PublishingStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishingStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
