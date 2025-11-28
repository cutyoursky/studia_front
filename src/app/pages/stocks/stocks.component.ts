import { HttpClient } from '@angular/common/http';
import { Component, OnInit, output } from '@angular/core';
import { Stock, StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { BuyStocksComponent } from '../buy-stocks/buy-stocks.component';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-stocks',
  imports: [CommonModule, BuyStocksComponent],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent implements OnInit{
  stocks: Stock[] = [];
  private subscription: Subscription | undefined;
  selectedStock: Stock | null = null;
  balanceChanged = output<number>(); // <-- output jako EventEmitter

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    // Pobieraj dane co 5 sekund
    this.subscription = interval(10000)
      .pipe(
        // Za każdym razem pobieraj aktualny stock
        switchMap(() => this.stockService.getStocks())
      )
      .subscribe(data => {
        this.stocks = data;
        console.log('Aktualizacja:', this.stocks);
      });

    // Pobranie od razu przy starcie
    this.stockService.getStocks().subscribe(data => {
      this.stocks = data;
    });
  }

  selectStock(stock: Stock) {
    this.selectedStock = stock;
  }

  closeStock() {
    this.selectedStock = null;
  }

  onBought() {
    this.selectedStock = null; // Zamknij okno po zakupie
    alert('Zakup zakończony sukcesem!');
  }

  onBalanceChanged(newBalance: number) {
    this.balanceChanged.emit(newBalance); 
  }
}
