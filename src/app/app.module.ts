import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceAPIService } from './service-api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient,HttpParams,HttpBackend } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [ServiceAPIService],
  bootstrap: []
})
export class AppModuleTsModule { }
