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
  poliza: any;
}

@Component({
  selector: 'app-content3-modal',
  templateUrl: './content3-modal.component.html',
  styleUrls: ['./content3-modal.component.scss']
})
export class Content3ModalComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public hasChanges = false;
  public disableButton = false;
  public isLoading = false;

  public addForm = this.fb.group({
    serial: new FormControl({value: '', disabled: false}, Validators.required),
    quantity: new FormControl({value: '', disabled: false}, Validators.required),
    producto: new FormControl({value: '', disabled: false}, Validators.required),
    empleado: new FormControl({value: '', disabled: false}, Validators.required),
  });

  public productOptions: any;
  public empleadoOptions: any;

  constructor(
    private dialogRef: MatDialogRef<Content3ModalComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public dataIn: dataIn,
  ) { }

  displayFn(user?: any): string | undefined {
    return user ? user.name : undefined;
  }

  ngOnInit(): void {
    if (!this.dataIn.isNew) this.setPatch(this.dataIn.poliza)
    this.setControls();
  }

  setPatch(poliza) {
    this.addForm.patchValue({...poliza});
  }

  setControls() {
    this.apiService.getDataObject('productos').then(data=> { 
      this.productOptions = data
    })

    this.apiService.getDataObject('empleados').then(data=> { 
      this.empleadoOptions = data
    })
  }

  async performRequest() {
    this.disableButton = true;
    this.isLoading = true;
    if (this.addForm.valid) {
      if (!this.dataIn.isNew) {
        try {
          const poliza = {
            ...this.addForm.value,
            producto: this.addForm.get('product').value._id,
            empleado: this.addForm.get('empleado').value._id
          };

          await this.apiService.editDataObject('polizas', poliza, this.dataIn.poliza._id).then(data=> {
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
          const poliza = {
            ...this.addForm.value,
            producto: this.addForm.get('product').value._id,
            empleado: this.addForm.get('empleado').value._id
          };

          await this.apiService.addDataObject('polizas', poliza).then(data=> {
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
