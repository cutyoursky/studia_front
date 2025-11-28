import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BalanceService } from '../../services/balance.service';

@Component({
  selector: 'app-wallet',
  imports: [CommonModule, FormsModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  private http = inject(HttpClient);
  private balanceService = inject(BalanceService);
  wallet: any[] = [];

  ngOnInit() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      alert('Musisz być zalogowany!');
      return;
    }

    this.http.get<any[]>(`http://localhost:8000/api/wallet/?user_id=${userId}`).subscribe(data => {
      this.wallet = data;
      console.log(this.wallet);
    });
  }

  sellStock(item: any) {
    const userId = localStorage.getItem('user_id');
    if (!userId || !item.sellAmount) return;

    this.http.post<{ new_balance: number }>('http://localhost:8000/api/stocks/sell/', {
      user_id: userId,
      stock: item,
      quantity: item.sellAmount
    }).subscribe({
      next: (res) => {
        alert('Sprzedano akcje');
        item.quantity -= item.sellAmount;
        if (item.quantity <= 0) {
          this.wallet = this.wallet.filter(i => i !== item);
        }
        this.balanceService.setBalance(res.new_balance);
      },
      error: (err) => {
        alert(err.error?.error || 'Błąd przy sprzedaży');
      }
    });
  }
}
