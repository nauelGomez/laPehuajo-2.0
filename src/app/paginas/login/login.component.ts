import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  async onSubmit(): Promise<void> {
    try {
      // Llama al servicio de autenticación
      const token = await this.authService.login(this.email, this.password);

      // Redirige al usuario después del login exitoso
      alert('¡Inicio de sesión exitoso!');
      this.router.navigate(['/admin-panel']);
      this.errorMessage = null;
    } catch (error) {
      // Muestra el mensaje de error en caso de fallo
      this.errorMessage = 'fallamos';
    }
  }
}
