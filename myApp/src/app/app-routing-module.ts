import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';

const routes: Routes = [
  { path: '', component: Login },
  { path: '', component: Login, pathMatch: 'full' },
  {
    path: '', children: [
      {
        path: 'dashboard', component: Dashboard
      }
    ]
  },
  { path: '**', component: Login }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
