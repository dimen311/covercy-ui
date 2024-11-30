import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiKeyModel } from '../models/apikey.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }


  apiKeyModel$ = new BehaviorSubject<ApiKeyModel[]>([]);

  getApiKey() {
    return this.apiKeyModel$.asObservable();
  }

  setApiKey(value: ApiKeyModel) {
    this.apiKeyModel$.next([...this.apiKeyModel$.getValue(), value])
  }
  setApiKeys(values: ApiKeyModel[]) {
    this.apiKeyModel$.next([...values])
  }
}
