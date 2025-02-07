import { TestBed } from '@angular/core/testing';

import { PatientEntryService } from './patient-entry.service';

describe('PatientEntryService', () => {
  let service: PatientEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
