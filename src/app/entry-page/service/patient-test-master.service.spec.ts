import { TestBed } from '@angular/core/testing';

import { PatientTestMasterService } from './patient-test-master.service';

describe('PatientTestMasterService', () => {
  let service: PatientTestMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientTestMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
