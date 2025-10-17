import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCreate } from './customers/customer-create/customer-create';
import { CustomerEdit } from './customers/customer-edit/customer-edit';
import { CostomerIndex } from './customers/customer-index/customer-index'

const routes: Routes = [
  { path: 'customers', component: CustomerIndex },
  { path: 'customer/create', component: CustomerCreate },
  { path: 'customers/edit/:id', component: CustomerEdit },
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
