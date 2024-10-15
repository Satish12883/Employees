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
  
  constructor(private service:ServiceAPIService,private route:ActivatedRoute){}
  result:any;
  userId:any;
  ngOnInit(){
    this.getUserFiles();
  }
  getUserFiles(){
    var content:any
    this.route.params.subscribe(params=>{
      this.userId=params['id'];
    });
    if(this.userId==0){
      alert("Invalid User ID ");
      return;
    }
    this.service.getUserFiles(this.userId,'DBM').then(data=>{
      this.result=data;

      // if(this.result.ResultData.length==0){
      //   alert("No details Found");
      //   return;
      // }
      // else if(this.result.ErrorDescription=="Data Not Found"){
      //   $('#MainDiv').css('display','none');
      //   alert("No details Found");
      //   return;
      // }

      $('#MainDiv').css('display','flex');
      content=this.result.ResultData[0].content;
      var fileName=this.result.ResultData[0].fileName;
      var imgPath="data:image/png;base64,"+content;
      var creationDate=new Date(this.result.ResultData[0].creationDate);
      var formattedDate = creationDate.toLocaleDateString();
      $('#userImg').attr('src',imgPath);
      $('#lblAge').text(this.result.ResultData[0].age);
      $('#lblGender').text(this.result.ResultData[0].gender);
      $('#lblUserName').text(this.result.ResultData[0].fullName);
      $('#lblAdd').text(this.result.ResultData[0].address);
      $('#lblCreationDate').text(formattedDate);
      $('#lblFileName').text(fileName);
      console.log(this.result.ResultData[0].fileName);
    })

  }
}
