import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSubirPorductoComponent } from './modal-subir-porducto.component';

describe('ModalSubirPorductoComponent', () => {
  let component: ModalSubirPorductoComponent;
  let fixture: ComponentFixture<ModalSubirPorductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSubirPorductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSubirPorductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
