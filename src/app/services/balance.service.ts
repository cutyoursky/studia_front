import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor() { }

  private balanceSubject = new BehaviorSubject<number | null>(null);
  balance$ = this.balanceSubject.asObservable();

  setBalance(newBalance: number) {
    this.balanceSubject.next(newBalance);
  }

  clearBalance() {
    this.balanceSubject.next(null);
  }
}
