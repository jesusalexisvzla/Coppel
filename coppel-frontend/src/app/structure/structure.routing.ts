import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/auth.guard';
import { StructureComponent } from './structure.component';

export const routes: Routes = [
    {
        path: '', 
        component: StructureComponent,
        // canActivate: [ AuthGuard ],
        children:[
            { path:'', redirectTo:'', pathMatch:'full' },
            { path: '', loadChildren: () => import('../components/components.module').then(m => m.ComponentsModule)  },
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class StructureRoutingModule { }