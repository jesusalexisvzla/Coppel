import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Content2ModalComponent } from './content2-modal.component';

describe('Content2ModalComponent', () => {
  let component: Content2ModalComponent;
  let fixture: ComponentFixture<Content2ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Content2ModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Content2ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
