import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLabManagementComponent } from './master-lab-management.component';

describe('MasterLabManagementComponent', () => {
  let component: MasterLabManagementComponent;
  let fixture: ComponentFixture<MasterLabManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterLabManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLabManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
