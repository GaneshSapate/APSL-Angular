import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageDetailsComponent } from './home-page-details.component';

describe('HomePageDetailsComponent', () => {
  let component: HomePageDetailsComponent;
  let fixture: ComponentFixture<HomePageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
