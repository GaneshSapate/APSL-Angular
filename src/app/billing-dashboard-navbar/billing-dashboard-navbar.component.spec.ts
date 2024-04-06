import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingDashboardNavbarComponent } from './billing-dashboard-navbar.component';

describe('BillingDashboardNavbarComponent', () => {
  let component: BillingDashboardNavbarComponent;
  let fixture: ComponentFixture<BillingDashboardNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingDashboardNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingDashboardNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
