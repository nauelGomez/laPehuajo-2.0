import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoViewComponent } from './producto-view.component';

describe('ProductoViewComponent', () => {
  let component: ProductoViewComponent;
  let fixture: ComponentFixture<ProductoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
