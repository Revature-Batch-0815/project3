import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchMessageService {

  private seachMessageSource = new BehaviorSubject<string>("i");
  public currentMessage = this.seachMessageSource.asObservable();

  constructor() { }

  changeMessage(data :any){
    this.seachMessageSource.next(data)
    this.currentMessage.subscribe(d => console.log(d))
  }
}
