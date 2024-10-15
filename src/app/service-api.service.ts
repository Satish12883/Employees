import { Injectable } from '@angular/core';
import { error } from 'console';
import { response } from 'express';
import { Observable } from 'rxjs';
import { UsersDTO } from './login/UsersDTO';
import { HttpClient,HttpParams } from '@angular/common/http';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class ServiceAPIService {
  constructor(){}
  private apiUrl='http://10.11.1.70/July25/API/Students/GetUsers';
  private getByIdURL=`http://10.11.1.70/July25/API/Students/GetUsersById`;
 
  private apiDeleteUser=`http://10.11.1.70/July25/API/Students/DeleteUser`

  getData():Promise<any>{
    return fetch(this.apiUrl)
    .then(response => {
      if (!response.ok) {
        console.error('Error While Getting Data');
      }
      return response.json(); 
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  } 
  GetUserById(userId:number):Promise<any>{
    const URL=`${this.getByIdURL}?userId=${userId}`;
    return fetch(URL).then(response=>{
      if(!response.ok){
        console.error(`Error While Getting Data UserID :${userId}`);
      }
      return response.json();
    }).catch(error=>{
      console.error('Error  While Getting Data:', error);
    })
  }
  DeleteUser(userId:number):Promise<any>{
    const URL=`${this.apiDeleteUser}?userId=${userId}`;
    return fetch(URL,{method:'DELETE'}).then(response=>{
        if(!response.ok){
          console.log("Error While Deleting Data")
        }
        return response.json();
      }).catch(error=>{
        console.log("Error :"+error);
      });
  }
  SaveUsers(usersDTO:UsersDTO){
    const SaveUsersURL=`http://10.11.1.70/July25/API/Students/SaveUsers`;

    return fetch(SaveUsersURL,{
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify(usersDTO),
    }).then(response=>{
      return response.json();
    }).catch(error=>{
      console.log("Error while Saving");
    });
  }

  getUserFiles(userId:number,portalAlias:string):Promise<any>{
    const URL = `http://10.11.1.70/July25/API/Students/GetUserFileDetails?userId=${userId}&portalAlias=${portalAlias}`;
    return fetch(URL).then(response=>{
      if(!response.ok){
        alert("Error While Getting Files");
      }
      return response.json();
    }).catch(error=>{
      alert(error);
    });
  }
}
