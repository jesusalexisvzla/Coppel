import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content3ModalComponent } from './content3-modal.component';

describe('Content3ModalComponent', () => {
  let component: Content3ModalComponent;
  let fixture: ComponentFixture<Content3ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Content3ModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Content3ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
