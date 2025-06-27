import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  register(formdata: NgForm) {
    const username = formdata.form.value.username;
    const password = formdata.form.value.password;
    this.authService.register(username, password).subscribe({
      next: () => {
        alert('Zarejestrowano!');
        this.router.navigate(['/login']);
      },
      error: err => alert(err.error.error || 'Błąd rejestracji')
    });
  }
}
