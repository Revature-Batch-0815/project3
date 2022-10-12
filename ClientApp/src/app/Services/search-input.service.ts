import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class searchInputService {
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }
}
