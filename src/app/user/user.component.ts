import { Component } from '@angular/core';
import { ServiceAPIService } from '../service-api.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { param } from 'jquery';
import { error } from 'console';
declare var $:any;
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  userImagePath: any = 'assets/user.jpg'; 
  constructor(private service:ServiceAPIService,private route:ActivatedRoute){}
  result:any;
  userId:any;
  ngOnInit(){
    this.getUserFiles();
  }
  getUserFiles(){
    
    this.route.params.subscribe(params=>{
      this.userId=params['id'];
    });
    if(this.userId==0){
      alert("Invalid User ID ");
      return;
    }
     this.service.getUserFiles(this.userId,'DBM').then(data=>{
      this.result=data;

      $('#MainDiv').css('display','flex');
      var content:any=this.result.ResultData[0].image;
      var fileName=this.result.ResultData[0].last_name+" "+this.result.ResultData[0].first_name;
      var formattedDate=new Date().getMonth()+"/"+new Date().getDate()+"/"+new Date().getFullYear();
      if(content!=null&&content!=""||content!=undefined){
        $('#userImg').attr('src',content);
        $('#lblCreationDate').text(formattedDate);
        $('#lblFileName').text(fileName);
      }
      else{
        $('#userImg').attr('src',this.userImagePath);
        $('#lblCreationDate').text(formattedDate);
        $('#lblFileName').text('user');
      }
      
      $('#lblAge').text(this.result.ResultData[0].age);
      $('#lblGender').text(this.result.ResultData[0].gender);
      $('#lblUserName').text(this.result.ResultData[0].first_name+" ("+this.userId+")");
      $('#lblAdd').text(this.result.ResultData[0].address);      
      console.log(this.userId);
    })

  }
}
