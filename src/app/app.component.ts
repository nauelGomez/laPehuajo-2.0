import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppCapsuleComponent } from './estructura/app-capsule/app-capsule.component';
import { FooterComponent } from './estructura/footer/footer.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AppCapsuleComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
  
})
export class AppComponent  {
  title = 'La Pehuajo';
  
}
