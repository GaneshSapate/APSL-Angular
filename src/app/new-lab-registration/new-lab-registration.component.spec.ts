import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLabRegistrationComponent } from './new-lab-registration.component';

describe('NewLabRegistrationComponent', () => {
  let component: NewLabRegistrationComponent;
  let fixture: ComponentFixture<NewLabRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewLabRegistrationComponent]
    });
    fixture = TestBed.createComponent(NewLabRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
