import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoTransporteComponent } from './pago-transporte.component';

describe('PagoTransporteComponent', () => {
  let component: PagoTransporteComponent;
  let fixture: ComponentFixture<PagoTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoTransporteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
