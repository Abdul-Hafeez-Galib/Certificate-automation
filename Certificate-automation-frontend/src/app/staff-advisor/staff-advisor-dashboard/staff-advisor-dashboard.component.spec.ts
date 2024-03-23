import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAdvisorDashboardComponent } from './staff-advisor-dashboard.component';

describe('StaffAdvisorDashboardComponent', () => {
  let component: StaffAdvisorDashboardComponent;
  let fixture: ComponentFixture<StaffAdvisorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffAdvisorDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAdvisorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
