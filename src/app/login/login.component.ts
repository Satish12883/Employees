import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceAPIService } from '../service-api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsersDTO } from './UsersDTO';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { error } from 'console';
declare var $:any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userForm=new FormGroup({
    name:new FormControl('',Validators.required)
  })



  constructor(private service:ServiceAPIService,private route:Router){}
  users:any;
  usersById:any;
  result:any;
  filePath:any;
  
  ngOnInit(){
   //this.getData();
  }

  name:string="Nemalikanti Sateesh";
  age:number=23;
  address:string="Veerlapalem";
  GetUserDetails():string{
    return `Name:,${this.name} Age:${this.age} Address:${this.address}`;
  }

getData(){  
  this.service.getData().then(data=>{
    this.users=data;
    if(this.users==null)
      alert("No Data Found..");
    
    $('#tblDiv').css('display','block');
    $('#ancUsers').css('display','none');
  });
}
editUser(userId:number){
 if(parseInt(userId.toString())!=0){
  this.service.GetUserById(userId).then(data=>{
    if(data==null){
      alert(`user not found Id:${userId}`);
      return;
    }
    this.usersById=data;
    $('input[id="lblUserId"]').val(this.usersById[0].userId);
    $('input[id="txtFirstName"]').val(this.usersById[0].firstName);
    $('input[id="txtLName"]').val(this.usersById[0].lastName);
    $('input[id="txtAge"]').val(this.usersById[0].age);
    $('input[id="txtCont"]').val(this.usersById[0].contact);
    $('textarea[id="txtAdd"]').val(this.usersById[0].address);
    if(this.usersById[0].gender.toUpperCase()=="MALE" || this.usersById[0].gender.toUpperCase()=="M"){
      $('input[id="rdbMale"][value="Male"]').prop("checked",true);
    }
    else if(this.usersById[0].gender.toUpperCase()=="FEMALE" || this.usersById[0].gender.toUpperCase()=="F"){
      $('input[id="rdbFeMale"][value="Female"]').prop("checked",true);
    } 
    if($('input[id="btnSave"]').val()=="Save"){
      $('input[id="btnSave"]').val('Update');
    }    
    //console.log(data);
  })
 }
}
SaveUsers(){
 const usersDTO:UsersDTO={
  firstName:$('input[id="txtFirstName"]').val(),
  lastName:$('input[id="txtLName"]').val(),
  age:$('input[id="txtAge"]').val(),
  address: $('textarea[id="txtAdd"]').val(),
  contact:$('input[id="txtCont"]').val(),
  gender:$('input[name="Gender"]:checked').val(),
  PortalAlias:'DBM',
  
  userId:$('input[id="lblUserId"]').val()==""?0:parseInt($('input[id="lblUserId"]').val())
 }
 
  if(this.ValidateDetails(usersDTO)==true){
    this.service.SaveUsers(usersDTO).then(data=>{
      this.result=data;
      if(this.result==undefined){
        alert("Ërror While Saving");
        return;
      }
      const resultData=parseInt(this.result.ResultData);
      if(resultData==1){
        alert(this.result.ErrorDescription);
        this.getData();
        this.ClearFileds();
        $('input[id="btnSave"]').val('Update');
      }
      if(resultData==0){
        alert(this.result.ErrorDescription);
      }
      console.log(this.result);
     });   
 }
}

DeleteUser(userId:number){  
  const response=window.confirm("Are you sure to delete this user.?");
  if(response==false)
    return;

  if(parseInt(userId.toString())!=0){
    this.service.DeleteUser(userId).then(data=>{
      this.result=data;
      const resultData=parseInt(this.result.ResultData);
      if(resultData==1){
        alert(`User :${userId} deleted successfully..`);
        this.ClearFileds();
      }
      else if(resultData==0){
        alert("Delete Failed.");
      }
      this.getData();
    },
    error=>{
      console.error('Error deleting user:', error);
        alert("An error occurred while deleting the user.");
    });
  }
  else{
    alert("Invalid User Id");
  }
}

ClearFileds(){
    $('input[id="lblUserId"]').val('');
    $('input[id="txtFirstName"]').val('');
    $('input[id="txtLName"]').val('');
    $('input[id="txtAge"]').val('');
    $('input[id="txtCont"]').val('');
    $('textarea[id="txtAdd"]').val('');
}

ValidateDetails(usersDTO:UsersDTO){
  $('#ErrorMsg').text('');
  var ErrorMsg:string='';
 var isValid:boolean=true;
 if(usersDTO.firstName==""){
  ErrorMsg+=" FirstName,";
 } 
 if(usersDTO.lastName==""){
  ErrorMsg+=" LastName,";
 }
 if(usersDTO.age==''){
   ErrorMsg+=" Age," ;
 }
 if(usersDTO.contact==''){
  usersDTO.contact='0000000000';
 }
 else if(usersDTO.contact.length<10){
  ErrorMsg+=" contact must be 10 letters,";
 } 
 if(usersDTO.address==""){
  usersDTO.address="123 any street";
 }

 if(ErrorMsg.length>0){
    ErrorMsg=ErrorMsg.substring(0,ErrorMsg.lastIndexOf(','));
    $('#ErrorMsg').text("Please Enter"+ErrorMsg.trimEnd());
    isValid=false;
 }
  return isValid;
}

navigateToUser(userId:number){
  if(userId==0||userId==undefined){
    alert("user not found.");
  }
  this.route.navigate(['/user',userId]);
  return false;
}
}
