/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImageErrorHandlerService } from './ImageErrorHandler.service';

describe('Service: ImageErrorHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageErrorHandlerService]
    });
  });

  it('should ...', inject([ImageErrorHandlerService], (service: ImageErrorHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
