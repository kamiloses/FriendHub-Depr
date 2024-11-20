import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalEnvironmentVariables {

  private globalSessionSubject = new BehaviorSubject<boolean>(false);
  private globalUsernameSubject = new BehaviorSubject<string | null>(null);
  private globalPasswordSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    this.initializeState();
  }

  private initializeState() {
    const storedSession = sessionStorage.getItem('globalSession') === 'true';
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    this.globalSessionSubject.next(storedSession);
    this.globalUsernameSubject.next(storedUsername);
    this.globalPasswordSubject.next(storedPassword);
  }

  getGlobalSession$() {
    return this.globalSessionSubject.asObservable();
  }

  setGlobalSession(value: boolean) {
    this.globalSessionSubject.next(value);
    sessionStorage.setItem('globalSession', value.toString());
  }

  getGlobalUsername$() {
    return this.globalUsernameSubject.asObservable();
  }

  setGlobalUsername(value: string | null) {
    this.globalUsernameSubject.next(value);
    if (value) {
      localStorage.setItem('username', value);
    } else {
      localStorage.removeItem('username');
    }
  }

  getGlobalPassword$() {
    return this.globalPasswordSubject.asObservable();
  }

  setGlobalPassword(value: string | null) {
    this.globalPasswordSubject.next(value);
    if (value) {
      localStorage.setItem('password', value);
    } else {
      localStorage.removeItem('password');
    }
  }
}
