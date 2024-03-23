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
      data.map((x:any)=>{
          if(x.role==0 && this.userData.program==x.program){
            this.request.push(x);
          }
        })
    })
    
  }

  accept(id:string){
    let data={
      approved:true,
      hod:this.userId
    }
    console.log(data);
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
            if(x.role==0){
              this.request.push(x);
            }
          })
      })
    })
    

  }

}
