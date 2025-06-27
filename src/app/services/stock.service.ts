import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Stock {
  symbol: string;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})

export class StockService {
  private apiUrl = 'http://localhost:8000/api/stocks/';

  constructor(private http: HttpClient) {}

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl);
  }
}
