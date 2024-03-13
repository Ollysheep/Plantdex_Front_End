import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImageErrorHandlerService {
  constructor() {}

  handleImageError(event: any) {
    event.target.src = 'assets/nopics.png';
  }
}
