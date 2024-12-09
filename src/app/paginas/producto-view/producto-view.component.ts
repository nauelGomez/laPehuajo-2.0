import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/servicio productos/product.service';
import { RootObject } from '../../services/servicio productos/product.interface';

@Component({
  selector: 'app-producto-view',
  standalone: true,
  templateUrl: './producto-view.component.html',
  styleUrls: ['./producto-view.component.css'],
})
export class ProductoViewComponent implements OnInit {
  product!: RootObject;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // Capturar el ID desde la URL
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('ID Capturado:', productId); // Verificar el ID en la consola
    if (productId) {
      this.loadProduct(+productId); // Convertir a número y cargar el producto
    } else {
      console.error('No se encontró el ID en la URL');
    }
  }

  // Cargar el producto usando el servicio
  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        console.log('Producto obtenido desde la API:', data);
        this.product = data;
      },
      error: (err) => {
        console.error('Error al obtener el producto:', err);
      },
      complete: () => {
        console.log('Carga de producto completada.');
      },
    });
  }
  
}
