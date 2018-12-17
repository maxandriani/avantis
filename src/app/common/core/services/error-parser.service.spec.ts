import { TestBed } from '@angular/core/testing';

import { ErrorParserService } from './error-parser.service';

describe('ErrorParserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorParserService = TestBed.get(ErrorParserService);
    expect(service).toBeTruthy();
  });
});
