import { TestBed } from '@angular/core/testing';

import { EntryModalService } from './entry-modal.service';

describe('EntryModalService', () => {
  let service: EntryModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
