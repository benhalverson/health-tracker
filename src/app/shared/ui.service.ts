import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * controls global UI functionality
 */
@Injectable({
  providedIn: 'root'
})
export class UIService {
  loadingStateChanged = new Subject<boolean>();
}
