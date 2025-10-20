import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CustomerCreate } from './customers/customer-create/customer-create';
import { CustomerEdit } from './customers/customer-edit/customer-edit';
import { CustomerIndex } from './customers/customer-index/customer-index';
import { EditButton } from './customers/customer-index/edit-button/edit-button';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    App,
    CustomerCreate,
    CustomerEdit,
    CustomerIndex,
    EditButton
  ],
  imports: [
    BrowserModule,
    AgGridModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    AppRoutingModule
  ],
  providers: [
    
  ],
  bootstrap: [App]
})
export class AppModule { }
