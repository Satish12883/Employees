import { Component, OnInit } from '@angular/core';
import { ServiceAPIService } from '../service-api.service';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public itemData:any;
  public PatientID:number=200;

  constructor(private service:ServiceAPIService){}

  ngOnInit(){

  }

  name:string="Nemalikanti Sateesh";
  age:number=23;
  address:string="Veerlapalem";

  GetUserDetails():string{
    return `Name:,${this.name} Age:${this.age} Address:${this.address}`;
  }
  // getPatientById(PatientID:number){
  //   this.service.getData(PatientID).subscribe(
  //     (response)=>{
  //       console.log("Result: ",PatientID,response);
  //       this.itemData=response;
  //     }
  //   )
  // }

}
