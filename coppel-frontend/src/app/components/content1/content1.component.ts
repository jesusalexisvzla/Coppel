import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
// import { UserComponent } from './user/user.component';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Content1ModalComponent } from './content1-modal/content1-modal.component';

export interface empleadoElement {
  name: string;
  email: string;
  isActive: boolean;
}

@Component({
  selector: 'app-content1',
  templateUrl: './content1.component.html',
  styleUrls: ['./content1.component.scss']
})
export class Content1Component implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public isLoading = false;
  public displayedColumns: string[] = ['name', 'email', 'isActive','edit','delete'];
  public dataSource: any;

  public searchbar = new FormControl({ value: '', disabled: false });

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getEmpleados();
    this.setListeners();
  }

  async getEmpleados(isQuery?, filter?) {
    this.isLoading = true;

    this.apiService.getDataObject('empleados').then(data=> {
      this.isLoading = false;
      this.dataSource = data;
    })
  }

  setListeners() {
    this.searchbar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(250)).subscribe((data => {
      if (data) {
        this.apiService.getDataObjectFiltered('empleadoss', {
          properties: ['name', 'email'],
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
        this.getEmpleados()
      }
    }))
  }

  addEditEmpleado(isNew, data?) {
    const dialogRef = this.dialog.open(Content1ModalComponent, {
      data: {
        title: (isNew ? 'Create ' : 'Edit ') + 'Empleado',
        isNew: isNew,
        Empleado: data
      },
      autoFocus: false,
      width: '800px',
      panelClass: 'plantillaModal',
      disableClose: true
    })

    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy)).subscribe(async (data) => {
      if ( data?.hasChanges ) this.getEmpleados();
    })
  }

  async deleteEmpleado(id) {
    try {
      await this.apiService.deleteDataObject('empleados', id).then(data=> {
        this.getEmpleados();
      })      
      // this.presentToast('Discount succesfully registered', 'green-snackbar');
    } catch (err) {
      console.log(err);
      this.getEmpleados();
      // this.presentToast('Conection Rejected', 'red-snackbar');
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
