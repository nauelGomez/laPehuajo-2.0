import { Injectable } from '@angular/core';
import { Product, RootObject } from './product.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://api.escuelajs.co/api/v1/products';
  constructor (private http: HttpClient) {}

  getProductsList(): Observable<RootObject[]> {
    return this.http.get<RootObject[]>(`${this.apiUrl}?offsengt=0&limit=20`).pipe(
      map((products: RootObject[]) =>
        products.map(product => this.normalizeProductImages(product))
      )
    );
  }
  
  

  getProductById(id: number): Observable<RootObject> {
    console.log('Solicitando producto con ID:', id);
    return this.http.get<RootObject>(`https://api.escuelajs.co/api/v1/products/${id}`).pipe(
      map((product: RootObject) => this.normalizeProductImages(product))
    );
  }
  
  
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
  
  updateProduct(id: number, productData: RootObject): Observable<RootObject> {
  // Limpia las imágenes antes de enviar el producto
  const normalizedProduct = this.normalizeProductImages(productData);

  // Transforma RootObject a Product
  const productToSend: Product = {
    title: normalizedProduct.title,
    price: normalizedProduct.price,
    description: normalizedProduct.description,
    categoryId: normalizedProduct.category.id, // Tomamos el ID de la categoría
    images: [...normalizedProduct.images], // Aseguramos que sea un array limpio
  };

  // Enviar datos al servidor
  return this.http.put<RootObject>(`${this.apiUrl}/${id}`, productToSend);
}
  
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private normalizeProductImages(product: RootObject): RootObject {
    if (product.images && Array.isArray(product.images)) {
      product.images = product.images.map(image =>
        image.replace(/^\[|\]$/g, '').replace(/^"|"$/g, '').trim()
      );
    }
    return product;
  }
  
  
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  addToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.getValue();

  // Asegúrate de que la cantidad siempre está definida
}
}