import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PateintPageComponent } from './pateint-page.component';

describe('PateintPageComponent', () => {
  let component: PateintPageComponent;
  let fixture: ComponentFixture<PateintPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PateintPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PateintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
