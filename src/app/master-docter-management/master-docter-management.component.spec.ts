import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDocterManagementComponent } from './master-docter-management.component';

describe('MasterDocterManagementComponent', () => {
  let component: MasterDocterManagementComponent;
  let fixture: ComponentFixture<MasterDocterManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterDocterManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDocterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
