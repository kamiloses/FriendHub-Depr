import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalEnvironmentVariables {

  private globalSessionSubject = new BehaviorSubject<boolean>(false);
  private globalUsernameSubject = new BehaviorSubject<string | null>(null);
  private globalPasswordSubject = new BehaviorSubject<string | null>(null);

  getGlobalSession$() {
    return this.globalSessionSubject.asObservable();
  }

  setGlobalSession(value: boolean) {
    this.globalSessionSubject.next(value);
  }

  getGlobalUsername$() {
    return this.globalUsernameSubject.asObservable();
  }

  setGlobalUsername(value: string | null) {
    this.globalUsernameSubject.next(value);
  }
  getGlobalPassword() {
    return this.globalPasswordSubject.asObservable();
  }

  setGlobalPassword(value: string | null) {
    this.globalPasswordSubject.next(value);
  }

}
