import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StocksComponent } from "./pages/stocks/stocks.component";
import { BalanceService } from './services/balance.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  private http = inject(HttpClient);
  private balanceService = inject(BalanceService); // Assuming balanceService is part of AuthService
  balance: number | null = null;

  ngOnInit(){
    this.balanceService.balance$.subscribe(balance => {
      this.balance = balance;
    });

    this.loadBalance();
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('user_id') !== null;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('user_id');
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Błąd przy wylogowywaniu');
      }
    });
  }

  loadBalance() {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      this.balance = null;
      return;
    }

    this.http.get<{ balance: number }>(`http://localhost:8000/api/balance/?user_id=${userId}`).subscribe({
      next: res => {
        this.balanceService.setBalance(res.balance);
      },
      error: () => {
        this.balanceService.clearBalance();
      }
    });
  }


}
