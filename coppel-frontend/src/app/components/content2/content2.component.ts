import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
// import { UserComponent } from './user/user.component';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Content2ModalComponent } from '../content2/content2-modal/content2-modal.component';

@Component({
  selector: 'app-content2',
  templateUrl: './content2.component.html',
  styleUrls: ['./content2.component.scss']
})
export class Content2Component implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public isLoading = false;
  public displayedColumns: string[] = ['name', 'cantidad','edit','delete'];
  public dataSource: any;

  public searchbar = new FormControl({ value: '', disabled: false });

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getProductos();
    this.setListeners();
  }

  async getProductos(isQuery?, filter?) {
    this.isLoading = true;

    this.apiService.getDataObject('productos').then(data=> {
      this.isLoading = false;
      this.dataSource = data;
    })
  }

  setListeners() {
    this.searchbar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(250)).subscribe((data => {
      if (data) {
        this.apiService.getDataObjectFiltered('productos', {
          properties: ['name'],
          value: data,
          options: {
            like: true,
            i: true
          }
        }).then(data => {
          this.isLoading = false;
          this.dataSource = data;
        })
      } else {
        this.getProductos()
      }
    }))
  }

  addEditProducto(isNew, data?) {
    const dialogRef = this.dialog.open(Content2ModalComponent, {
      data: {
        title: (isNew ? 'Create ' : 'Edit ') + 'Producto',
        isNew: isNew,
        producto: data
      },
      autoFocus: false,
      width: '800px',
      panelClass: 'plantillaModal',
      disableClose: true
    })

    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy)).subscribe(async (data) => {
      if ( data?.hasChanges ) this.getProductos();
    })
  }

  addInventory() {
    const dialogRef = this.dialog.open(Content2ModalComponent, {
      data: {
        title: 'Agregar Inventario',
        isNew: false,
        isInventory: true,
      },
      autoFocus: false,
      width: '800px',
      panelClass: 'plantillaModal',
      disableClose: true
    })

    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy)).subscribe(async (data) => {
      if ( data?.hasChanges ) this.getProductos();
    })
  }

  async deleteProducto(id) {
    try {
      await this.apiService.deleteDataObject('productos', id).then(data=> {
        this.getProductos();
      })      
      // this.presentToast('Discount succesfully registered', 'green-snackbar');
    } catch (err) {
      console.log(err);
      this.getProductos();
      // this.presentToast('Conection Rejected', 'red-snackbar');
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}

