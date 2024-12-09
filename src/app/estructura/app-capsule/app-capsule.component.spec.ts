import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppCapsuleComponent } from './app-capsule.component';

describe('AppCapsuleComponent', () => {
  let component: AppCapsuleComponent;
  let fixture: ComponentFixture<AppCapsuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppCapsuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCapsuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
