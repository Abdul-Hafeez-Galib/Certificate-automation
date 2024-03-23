import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface StudentData{
  name:string,
  department:string,
  branch:string,
  batch:number,
  program:string,
  semester:string,
  admissionNo:number,
  twelfthPercentage:number
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl='http://localhost:3000';

  constructor(private http:HttpClient) { }

  getUser(userType:string){
    return this.http.get(this.baseUrl+'/get/'+userType);
  }

  addUser(data:any,userType:string){
    return this.http.post(this.baseUrl+'/register/'+userType,data);
  }
  acceptUser(id:string,body:any){
    return this.http.patch(this.baseUrl+'/acceptUser/'+id,body);
  }

  forward(id:string,body:any){
    return this.http.patch(this.baseUrl+'/forward/'+id,body);
  }

  deleteCertificateRequest(id:string){
    return this.http.delete(this.baseUrl+'/deleteRequest/'+id);
  }
  getApplicationForms(id:string){
    return this.http.get(this.baseUrl+'/getAppliedForms/'+id);
  }

  findApplicationForm(id:string){
    return this.http.get(this.baseUrl+'/getApplicationForm/'+id);
  }

  getTemplate(type:Number){
    return this.http.get(this.baseUrl+'/getTemplate/'+type);
  }
}
