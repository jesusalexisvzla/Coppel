import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { observable, Observable, Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { debounceTime, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface dataIn {
  title: string;
  isNew: boolean;
  empleado: any;
}

@Component({
  selector: 'app-content1-modal',
  templateUrl: './content1-modal.component.html',
  styleUrls: ['./content1-modal.component.scss']
})
export class Content1ModalComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public hasChanges = false;
  public disableButton = false;
  public isLoading = false;

  public addForm = this.fb.group({
    name: new FormControl({value: '', disabled: false}, Validators.required),
    email: new FormControl({value: '', disabled: false}, Validators.required),
    password: new FormControl({value: '', disabled: false}, Validators.required),
    isActive: new FormControl({value: true, disabled: false}),
  });

  constructor(
    private dialogRef: MatDialogRef<Content1ModalComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public dataIn: dataIn,
  ) { }

  ngOnInit(): void {
    if (!this.dataIn.isNew) this.setPatch(this.dataIn.empleado)
  }

  setPatch(empleado) {
    this.addForm.patchValue({...empleado});
  }

  async performRequest() {
    this.disableButton = true;
    this.isLoading = true;
    if (this.addForm.valid) {
      if (!this.dataIn.isNew) {
        try {
          const empleado = this.addForm.value;

          await this.apiService.editDataObject('empleados', empleado, this.dataIn.empleado._id).then(data=> {
            this.isLoading = false;
            this.hasChanges = true
            this.closeModal();
          })      
        } catch (err) {
          console.log(err);
          this.disableButton = false;
          this.isLoading = false;
        }
      } else {
        try {
          let empleado = this.addForm.value;
          empleado['isActive'] = true;

          await this.apiService.addDataObject('empleados', empleado).then(data=> {
            this.isLoading = false;
            this.hasChanges = true
            this.closeModal();
          })      
        } catch (err) {
          console.log(err);
          this.disableButton = false;
          this.isLoading = false;
        }
      }
    } else {
      this.disableButton = false;
      this.isLoading = false;
    }
  }

  showToast(mensaje: string, style: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: [style],
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

  closeModal(): void {
    this.dialogRef.close({ hasChanges: this.hasChanges });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
