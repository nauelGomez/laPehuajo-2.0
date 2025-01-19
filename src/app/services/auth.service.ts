import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environment/environment.component';
import { isLocalStorageAvailable } from './storage/storage.component';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = `${environment.apiBaseUrl}/auth/login`;


  async login(email: string, password: string): Promise<void> {
    try {
      const response = await axios.post(this.authUrl, { email, password });
      const token = response.data.token;

      if (isLocalStorageAvailable()) {
        localStorage.setItem('authToken', token); 
        console.warn('localStorage no está disponible. El token no se pudo guardar.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      throw error;
    }
  }


  logout(): void {
    if (isLocalStorageAvailable()) {
      localStorage.removeItem('authToken'); 
    } else {
      console.warn('localStorage no está disponible. No se pudo eliminar el token.');
    }
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    if (isLocalStorageAvailable()) {
      const token = localStorage.getItem('authToken');
      return !!token; // Devuelve true si hay un token guardado
    }
    console.warn('localStorage no está disponible. No se puede verificar la autenticación.');
    return false;
  }

  // Método para obtener el token
  getToken(): string | null {
    if (isLocalStorageAvailable()) {
      return localStorage.getItem('authToken');
    }
    console.warn('localStorage no está disponible. No se puede obtener el token.');
    return null;
  }
}
