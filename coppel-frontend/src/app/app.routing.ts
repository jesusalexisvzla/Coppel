
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';  
// import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '',      loadChildren: () => import('./structure/structure.module').then(m => m.StructureModule)},
  { path: 'login', loadChildren: () => import('./structure/login/login.module').then(m => m.LoginModule) },
  { path: '**', redirectTo: '' },
]; 

@NgModule({
  imports: [
      RouterModule.forRoot(routes, { 
        relativeLinkResolution: 'legacy',
      // preloadingStrategy: PreloadAllModules, // <- comment this line for activate lazy load
      // useHash: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }