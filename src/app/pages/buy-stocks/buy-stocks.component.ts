import { HttpClient } from '@angular/common/http';
import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BalanceService } from '../../services/balance.service';

@Component({
  selector: 'app-buy-stocks',
  imports: [FormsModule],
  templateUrl: './buy-stocks.component.html',
  styleUrl: './buy-stocks.component.css',
})
export class BuyStocksComponent {

  stock = input<any>(); // <-- input jako funkcja

  bought = output<void>(); // <-- output jako EventEmitter
  cancel = output<void>(); // <-- output jako EventEmitter
  quantity = 1;
  private http = inject(HttpClient);
  private balanceService = inject(BalanceService)

  buyStock() {
    console.log(this.stock());
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert('Musisz być zalogowany!');
      return;
    }

    const payload = {
      user_id: +userId,
      stock: this.stock(),
      quantity: this.quantity,
    };

    this.http.post<{new_balance: number}>('http://localhost:8000/api/stocks/buy/', payload).subscribe({
      next: (res) => {
        this.balanceService.setBalance(res.new_balance); // <-- wyemituj zdarzenie zmiany salda
        this.bought.emit(); // <-- wyemituj zdarzenie "kupione"
      },
      error: (err) => {
        alert(err.error?.error || 'Wystąpił błąd przy zakupie.');
      },
    });
  }
}
