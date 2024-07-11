import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMedicoComponent } from './modal-medico.component';

describe('ModalMedicoComponent', () => {
  let component: ModalMedicoComponent;
  let fixture: ComponentFixture<ModalMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalMedicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
