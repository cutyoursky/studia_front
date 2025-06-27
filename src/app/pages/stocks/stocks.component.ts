import { HttpClient } from '@angular/common/http';
import { Component, OnInit, output } from '@angular/core';
import { Stock, StockService } from '../../services/stock.service';
import { CommonModule } from '@angular/common';
import { BuyStocksComponent } from '../buy-stocks/buy-stocks.component';

@Component({
  selector: 'app-stocks',
  imports: [CommonModule, BuyStocksComponent],
  templateUrl: './stocks.component.html',
  styleUrl: './stocks.component.css'
})
export class StocksComponent implements OnInit{
  stocks: Stock[] = [];
  selectedStock: Stock | null = null;
  balanceChanged = output<number>(); // <-- output jako EventEmitter

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.stockService.getStocks().subscribe((data) => {
      this.stocks = data;
    })
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
