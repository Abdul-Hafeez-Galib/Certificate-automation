import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ApiService } from 'src/api.service';
import { ViewApplicationFormDialogComponent } from 'src/app/view-application-form-dialog/view-application-form-dialog.component';
@Component({
  selector: 'app-certificate-request',
  templateUrl: './certificate-request.component.html',
  styleUrls: ['./certificate-request.component.css']
})
export class CertificateRequestComponent implements OnInit {
  userData:any;
  userId:any;
  request:any=[];
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

    this.apiService.getApplicationForms(this.userId).subscribe((data:any)=>{
      console.log(data);
      this.request=data;
    })
  }

  view(data:any){
    this.dialog.open(ViewApplicationFormDialogComponent,{
        width: '400px',
        data: data
      })
  }

}
