import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUploadErrorsComponent } from './view-upload-errors.component';

describe('ViewUploadErrorsComponent', () => {
  let component: ViewUploadErrorsComponent;
  let fixture: ComponentFixture<ViewUploadErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUploadErrorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUploadErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
