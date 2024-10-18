import { Component } from '@angular/core';
import { ServiceAPIService } from '../service-api.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  result:any;
 constructor(private service:ServiceAPIService){}

 getUsers(){
  this.service.getUsers().then(data=>{
   this.result=data;
   console.log(this.result);
  })
 }
}
