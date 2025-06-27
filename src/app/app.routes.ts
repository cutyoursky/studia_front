import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StocksComponent } from './pages/stocks/stocks.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { WalletComponent } from './pages/wallet/wallet.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'stocks', component: StocksComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'wallet', component: WalletComponent }
];
