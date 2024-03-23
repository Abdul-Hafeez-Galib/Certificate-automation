import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/api.service';
import {AlertComponent} from '../../alert/alert.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-approval-request',
  templateUrl: './approval-request.component.html',
  styleUrls: ['./approval-request.component.css']
})
export class ApprovalRequestComponent implements OnInit {
  request:any=[];
  userId:any;
  userData:any;
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
    console.log(this.userData);
    this.userId=this.userData._id;

    this.apiService.getUser('student').subscribe((data:any)=>{
      console.log(data);
      this.request=[];
      if(this.userData.department && this.userData.semester && this.userData.batch){
        for(var i=0;i<data.length;i++){

          console.log(data[i]);
            if(true){
              console.log(data[i]);
              this.request.push(data[i]);
            }

        }
      }
    })


  }

  accept(id:string){
    let data={
      approved:true,
      staffAdvisor:this.userId
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

      this.apiService.getUser('student').subscribe((data:any)=>{
        console.log(data);
        this.request=data;
      })

    })
  }

}
