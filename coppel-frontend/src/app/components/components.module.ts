import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { MaterialModule } from '../structure/material/material.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { Content1Component } from './content1/content1.component';
import { Content1ModalComponent } from './content1/content1-modal/content1-modal.component';
import { Content2Component } from './content2/content2.component';
import { Content3Component } from './content3/content3.component';
import { Content3ModalComponent } from './content3/content3-modal/content3-modal.component';
import { Content2ModalComponent } from './content2/content2-modal/content2-modal.component';

@NgModule({
    declarations: [
        Content1Component,
        Content1ModalComponent,
        Content2Component,
        Content3Component,
        Content3ModalComponent,
        Content2ModalComponent,
    ],
    imports: [
        CommonModule,
        ComponentsRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [
    ]
})
export class ComponentsModule { }