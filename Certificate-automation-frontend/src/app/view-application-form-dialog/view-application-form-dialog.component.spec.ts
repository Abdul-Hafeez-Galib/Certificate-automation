import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicationFormDialogComponent } from './view-application-form-dialog.component';

describe('ViewApplicationFormDialogComponent', () => {
  let component: ViewApplicationFormDialogComponent;
  let fixture: ComponentFixture<ViewApplicationFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewApplicationFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewApplicationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
