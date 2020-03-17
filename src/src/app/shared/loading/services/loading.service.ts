import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';


export class LoadingService {

  isLoading = false;
  private loadingEvent = new Subject<void>();
  public loadingEnd$ = this.loadingEvent.asObservable();
  receivedFilter: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  getLoading() {
    return this.isLoading;
  }

  startLoading() {
    if (!this.isLoading){
      this.isLoading = true;
      this.receivedFilter.emit(this.isLoading);
    }
  }

  stopLoading() {
    if(this.isLoading){
      this.isLoading = false;
      this.receivedFilter.emit(this.isLoading);
    }
  }

}
