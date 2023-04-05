import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructureComponent } from './structure.component';
import { StructureRoutingModule } from './structure.routing';
import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ComponentsModule } from '../components/components.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
      CommonModule,
      StructureRoutingModule,
      ComponentsModule,
      MatIconModule,
      HttpClientModule,
    ],
    declarations: [ 
      StructureComponent,
      NavbarComponent,
      SidebarComponent,
    ],
    providers:[
    ]
  })
  export class StructureModule { }