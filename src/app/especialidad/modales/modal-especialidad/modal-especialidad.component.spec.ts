import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEspecialidadComponent } from './modal-especialidad.component';

describe('ModalEspecialidadComponent', () => {
  let component: ModalEspecialidadComponent;
  let fixture: ComponentFixture<ModalEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEspecialidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
