import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
// import { UserComponent } from './user/user.component';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Content3ModalComponent } from '../content3/content3-modal/content3-modal.component';

@Component({
  selector: 'app-content3',
  templateUrl: './content3.component.html',
  styleUrls: ['./content3.component.scss']
})
export class Content3Component implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public isLoading = false;
  public displayedColumns: string[] = ['serial', 'quantity', 'producto', 'empleado','edit','delete'];
  public dataSource: any;

  public searchbar = new FormControl({ value: '', disabled: false });

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getPolizas();
    this.setListeners();
  }

  async getPolizas(isQuery?, filter?) {
    this.isLoading = true;

    this.apiService.getDataObject('polizas').then(data=> {
      this.isLoading = false;
      this.dataSource = data;
    })
  }

  setListeners() {
    this.searchbar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(250)).subscribe((data => {
      if (data) {
        this.apiService.getDataObjectFiltered('polizas', {
          properties: ['serial'],
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
        this.getPolizas()
      }
    }))
  }

  addEditPoliza(isNew, data?) {
    const dialogRef = this.dialog.open(Content3ModalComponent, {
      data: {
        title: (isNew ? 'Create ' : 'Edit ') + 'Poliza',
        isNew: isNew,
        poliza: data
      },
      autoFocus: false,
      width: '800px',
      panelClass: 'plantillaModal',
      disableClose: true
    })

    dialogRef.afterClosed().pipe(takeUntil(this.onDestroy)).subscribe(async (data) => {
      if ( data?.hasChanges ) this.getPolizas();
    })
  }

  async deletePoliza(id) {
    try {
      await this.apiService.deleteDataObject('polizas', id).then(data=> {
        this.getPolizas();
      })      
      // this.presentToast('Discount succesfully registered', 'green-snackbar');
    } catch (err) {
      console.log(err);
      this.getPolizas();
      // this.presentToast('Conection Rejected', 'red-snackbar');
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
