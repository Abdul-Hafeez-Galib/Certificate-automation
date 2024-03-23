import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDocImageEditComponent } from './custom-doc-image-edit.component';

describe('CustomDocImageEditComponent', () => {
  let component: CustomDocImageEditComponent;
  let fixture: ComponentFixture<CustomDocImageEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDocImageEditComponent]
    });
    fixture = TestBed.createComponent(CustomDocImageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
