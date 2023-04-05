import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Content1Component } from './content1/content1.component';
import { Content2Component } from './content2/content2.component';
import { Content3Component } from './content3/content3.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'empleados',
        pathMatch: 'full'
    },
    {
        path: 'empleados',
        component: Content1Component,
    },
    {
        path: 'productos',
        component: Content2Component,
    },
    {
        path: 'polizas',
        component: Content3Component,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ComponentsRoutingModule { }