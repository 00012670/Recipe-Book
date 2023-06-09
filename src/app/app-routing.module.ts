import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { 
    path: 'recipes', 
    loadChildren: () => import('./recipes/recipes.module').then (m => m.RecipiesModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'shopping-list', 
    loadChildren: () => import('./shopping-list/shopping-list.module').then (m => m.ShoppingListModule) 
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then (m => m.AuthModule) 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
