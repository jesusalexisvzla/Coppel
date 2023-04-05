import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content1ModalComponent } from './content1-modal.component';

describe('Content1ModalComponent', () => {
  let component: Content1ModalComponent;
  let fixture: ComponentFixture<Content1ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Content1ModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Content1ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
