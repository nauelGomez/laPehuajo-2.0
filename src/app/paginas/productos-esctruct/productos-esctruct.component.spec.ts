import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosEsctructComponent } from './productos-esctruct.component';

describe('ProductosEsctructComponent', () => {
  let component: ProductosEsctructComponent;
  let fixture: ComponentFixture<ProductosEsctructComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosEsctructComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosEsctructComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
