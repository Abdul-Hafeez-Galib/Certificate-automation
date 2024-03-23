import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ApiService } from 'src/api.service';
import {AlertComponent} from '../../alert/alert.component';

@Component({
  selector: 'app-approval-request',
  templateUrl: './approval-request.component.html',
  styleUrls: ['./approval-request.component.css']
})
export class ApprovalRequestComponent implements OnInit {
  request:any=[];
  userData:any;
  userId:any;
  constructor(private apiService:ApiService,private dialog:MatDialog) { }

  ngOnInit(): void {

    const token =localStorage.getItem("userToken");
    console.log(token);
    if (token) {
      this.userData = token.split(".")[1];
      this.userData = window.atob(this.userData);
      this.userData=JSON.parse(this.userData);

    }
    this.userData=this.userData.user;
    this.userId=this.userData._id;
    

    this.apiService.getUser('faculty').subscribe((data:any)=>{
      console.log(data);

      if(this.userData.level=='UG'){
        data.map((x:any)=>{
          if(x.role==1 && (x.program=='B.Tech' || x.program=='B.Arch')){
            this.request.push(x);
          }
        })
      }
      else if(this.userData.level=='PG'){
        data.map((x:any)=>{
          if(x.role==1 && (x.program=='M.Tech' || x.program=='M.Arch' || x.program=='M.Plan' || x.program=='MCA' || x.program=='MBA')){
            this.request.push(x);
          }
        })
      }
      else{
        data.map((x:any)=>{
          if(x.role==1 && (x.program=='Phd')){
            this.request.push(x);
          }
        })
      }
      
    })
  }

  accept(id:string){
    let data={
      approved:true,
      dean:this.userId
    }

    this.apiService.acceptUser(id,data).subscribe((res:any)=>{
      console.log(res);
      this.dialog.open(AlertComponent,{
        width: '250px',
        data: {
          title: 'Alert',
          message: 'Success!'
        }
      })

      this.request=[];
      this.apiService.getUser('faculty').subscribe((data:any)=>{
        console.log(data);
        data.map((x:any)=>{
          if(x.role==1){
            this.request.push(x);
          }
        })
      })

    })
  }

}
