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
  isInventory: boolean;
  producto: any;
}

@Component({
  selector: 'app-content2-modal',
  templateUrl: './content2-modal.component.html',
  styleUrls: ['./content2-modal.component.scss']
})
export class Content2ModalComponent implements OnInit,OnDestroy {
  private onDestroy = new Subject<void>();

  public hasChanges = false;
  public disableButton = false;
  public isLoading = false;

  public addForm = this.fb.group({
    name: new FormControl({value: '', disabled: false}, !this.dataIn.isInventory ? Validators.required : []),
    product: new FormControl({value: '', disabled: false}, this.dataIn.isInventory ? Validators.required : []),
    quantity: new FormControl({value: '', disabled: false}, Validators.required),
  });

  public productOptions: any;

  constructor(
    private dialogRef: MatDialogRef<Content2ModalComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public dataIn: dataIn,
  ) { }

  displayFn(user?: any): string | undefined {
    return user ? user.name : undefined;
  }

  ngOnInit(): void {
    if (!this.dataIn.isNew) this.setPatch(this.dataIn.producto)
    this.setControls();
  }

  setPatch(user) {
    this.addForm.patchValue({...user});
  }

  setControls() {
    this.apiService.getDataObject('productos').then(data=> { 
      this.productOptions = data
    })
  }

  async performRequest() {
    this.disableButton = true;
    this.isLoading = true;
    if (this.addForm.valid) {
      if (!this.dataIn.isNew || this.dataIn.isInventory) {
        try {
          const producto = {...this.addForm.value};
          let productId = this.dataIn.isInventory ? this.addForm.get('product').value._id : this.dataIn.producto._id
          if (this.dataIn.isInventory) {
            producto.quantity += producto.product.quantity
            delete producto.name
          } 
          delete producto.product

          await this.apiService.editDataObject('productos', producto, productId).then(data=> {
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
          let producto = this.addForm.value;

          await this.apiService.addDataObject('productos', producto).then(data=> {
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
