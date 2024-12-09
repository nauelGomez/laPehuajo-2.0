import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CarouselProductsComponent } from "../carousel-products/carousel-products.component";
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CarouselProductsComponent, CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioComponent {

}
