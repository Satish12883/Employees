import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class ServiceAPIService {

  private apiUrl='http://10.11.1.70/July25/API/PatientDetails/GetPatientDetails/{PatientID}';
  constructor(private http:HttpClient) { }
  getData(PatientID:number):Observable<any>{
    const url=`${this.apiUrl}/${PatientID}`
    return this.http.get(url);
  }
}
