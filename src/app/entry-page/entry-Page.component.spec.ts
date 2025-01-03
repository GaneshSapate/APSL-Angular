import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryPageComponent } from './entry-Page.component';

describe('EntryDetailsComponent', () => {
  let component: EntryPageComponent;
  let fixture: ComponentFixture<EntryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
