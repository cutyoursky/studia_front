import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: any;
  constructor(private authService: AuthService, private router: Router) {}

  login(formdata: NgForm) {
    const username = formdata.form.value.username;
    const password = formdata.form.value.password;

    this.authService.login(username, password).subscribe({
      next: (res) => {
        alert('Zalogowano!');
        localStorage.setItem('user_id', res.user_id);
        this.router.navigate(['/']); // lub gdziekolwiek kierujesz po logowaniu
      },
      error: err => alert(err.error.error || 'Błąd logowania')
    });
  }
}
