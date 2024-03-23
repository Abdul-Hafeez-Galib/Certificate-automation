import { Component, OnInit,Inject } from '@angular/core';
import {UntypedFormBuilder,UntypedFormControl,UntypedFormGroup,Validators } from '@angular/forms';
import { ApiService } from 'src/api.service';
import { AlertComponent } from '../alert/alert.component';
import { MatDialogRef,MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ImageEditorComponent, ShapeChangeEventArgs, ToolbarEventArgs } from '@syncfusion/ej2-angular-image-editor';
import { CustomDocImageEditComponent } from '../custom-doc-image-edit/custom-doc-image-edit.component';

@Component({
  selector: 'app-view-application-form-dialog',
  templateUrl: './view-application-form-dialog.component.html',
  styleUrls: ['./view-application-form-dialog.component.css']
})
export class ViewApplicationFormDialogComponent implements OnInit {
  applicationForm!:UntypedFormGroup;
  certificates:any=[];
  userData:any;
  userId:any;
  userType!:string;
  constructor(private fb:UntypedFormBuilder,private apiService:ApiService,public dialogRef: MatDialogRef<ViewApplicationFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private dialog:MatDialog) { }

  ngOnInit(): void {
    this.applicationForm=this.fb.group({
      name:new UntypedFormControl('',Validators.required),
      admissionNo:new UntypedFormControl('',Validators.required),
      regNo:new UntypedFormControl('',Validators.required),
      program:new UntypedFormControl('',Validators.required),
      semester:new UntypedFormControl('',Validators.required),
      scholarship:new UntypedFormControl('',Validators.required),
      otherScholarship:new UntypedFormControl(''),
      bonaFide:new UntypedFormControl(false),
      feeStructure:new UntypedFormControl(false),
      gpaToPercentage:new UntypedFormControl(false),
      promotion:new UntypedFormControl(false),
      mediumOfInstruction:new UntypedFormControl(false),
      otherCertificates:new UntypedFormControl(''),
      specificFormat:new UntypedFormControl(false),
      photoInFormat:new UntypedFormControl(''),
      phoneNumber:new UntypedFormControl('',Validators.required),
      email:new UntypedFormControl('',Validators.required),
      signature:new UntypedFormControl('',Validators.required),
    })

    if(this.data){
      this.applicationForm.get('name')?.setValue(this.data.name);
      this.applicationForm.get('admissionNo')?.setValue(this.data.admissionNo);
      this.applicationForm.get('regNo')?.setValue(this.data.regNo);
      this.applicationForm.get('program')?.setValue(this.data.program);
      this.applicationForm.get('semester')?.setValue(this.data.semester);
      this.applicationForm.get('scholarship')?.setValue(this.data.scholarship);
      this.applicationForm.get('phoneNumber')?.setValue(this.data.phoneNumber);
      this.applicationForm.get('email')?.setValue(this.data.email);

      this.certificates=this.data.certificateType;
      console.log(this.certificates);
    }

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
    this.userType=this.userData.userType;
  }


  forward(){

    if(this.userType!="dean"){
      let doneBy:String;
      if(this.userData.hod){
        doneBy="HOD";
      }
      else if(this.userData.dean){
        doneBy="Dean";
      }
      else{
        doneBy="Principal";
      }

      let dataToUpdate={
        to:this.userData.hod || this.userData.dean || this.userData.principal,
        status:"Under review by "+`${doneBy}`
      }
      this.apiService.forward(this.data._id,dataToUpdate).subscribe((result:any)=>{
        console.log(result);
        this.dialog.open(AlertComponent,{
          width: '250px',
          data: {
            title: 'Alert',
            message: 'Success!',

          }
        })
        setTimeout(()=>{
          this.dialog.closeAll();
        },500);
        window.location.reload();
      })
    }

  }

  cancel(){
    this.apiService.deleteCertificateRequest(this.data._id).subscribe((result:any)=>{
        console.log(result);
        this.dialog.open(AlertComponent,{
          width: '250px',
          data: {
            title: 'Alert',
            message: 'Deleted!',

          }
        })
        setTimeout(()=>{
          this.dialog.closeAll();
        },500);
        window.location.reload();
      })
  }
  verifyReturn(){
    if(this.userType=="dean"){
      let dataToUpdate={
        to:this.data.from,
        status:"Completed"
      }
      this.apiService.forward(this.data._id,dataToUpdate).subscribe((result:any)=>{
        console.log(result);
        this.dialog.open(AlertComponent,{
          width: '250px',
          data: {
            title: 'Alert',
            message: 'Success!',

          }
        })
        setTimeout(()=>{
          this.dialog.closeAll();
        },500);
        window.location.reload();
      })
    }
  }

  editCustomDoc(){
    this.dialog.open(CustomDocImageEditComponent);
  }
}
