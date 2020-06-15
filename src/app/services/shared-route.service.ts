import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedRouteService {

  private emitChangeParam = new Subject<string>();
  paramEmitted = this.emitChangeParam.asObservable();

  constructor() { }

  emitParamChange(param: string) {
    this.emitChangeParam.next(param);
  }
}
