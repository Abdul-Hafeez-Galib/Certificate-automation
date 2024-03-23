import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeanDashboardComponent } from './dean-dashboard.component';

describe('DeanDashboardComponent', () => {
  let component: DeanDashboardComponent;
  let fixture: ComponentFixture<DeanDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeanDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeanDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
