import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceAPIService } from './service-api.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
  ],
  providers: [ServiceAPIService], // Add services here, if any
  bootstrap: []
})
export class AppModuleTsModule { }
