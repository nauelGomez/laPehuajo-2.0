import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  constructor(private router: Router) {}
  onSubmit(): void {
    if (this.email === 'lapehuajo@admin.com' && this.password === 'admin123') {
      alert('¡Inicio de sesión exitoso!');
      this.router.navigate(['/admin-panel']);
      this.errorMessage = null;
    } else {
      this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
    }
  }
}
