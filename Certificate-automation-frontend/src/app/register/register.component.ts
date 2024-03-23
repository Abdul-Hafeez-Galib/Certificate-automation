import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder,UntypedFormControl,UntypedFormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';
// import {
//   MomentDateAdapter,
//   MAT_MOMENT_DATE_ADAPTER_OPTIONS,
// } from '@angular/material-moment-adapter';
// import {
//   DateAdapter,
//   MAT_DATE_FORMATS,
//   MAT_DATE_LOCALE,
// } from '@angular/material/core';

// import * as _moment from 'moment';
// // tslint:disable-next-line:no-duplicate-imports
// import { default as _rollupMoment, Moment } from 'moment';

// const moment = _rollupMoment || _moment;

// // See the Moment.js docs for the meaning of these formats:
// // https://momentjs.com/docs/#/displaying/format/
// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'YYYY',
//   },
//   display: {
//     dateInput: 'YYYY',
//     monthYearLabel: 'YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'YYYY',
//   },
// };

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  // providers: [
  //   // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
  //   // application's root module. We provide it at the component level here, due to limitations of
  //   // our example generation script.
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
  //   },

  //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  // ],
})
export class RegisterComponent implements OnInit {
  registerForm!:UntypedFormGroup;
  programs=['B.Tech','M.Tech','B.Arch','M.Arch','M.Plan','MCA','Phd','MBA'];
  semesters=['S1','S2','S3','S4','S5','S6','S7','S8'];
  admissionTypes=['Normal','LET','College Transfer','Other'];
  reservations=['SC','ST','PH','OBC','OEC','OBC(H)','General','Other'];
  egrantzTypes=['SC','ST','OEC','OBC(H)','Fishermen','N/A'];
  departments=['Computer Science & Engineering','Mechanical Engineering','Electrical & Electronics Engineering','Civil Engineering','Electronics Engineering','Architecture','CETSOM','Computer applications'];
  branches=['CSE','ME','EEE','Civil','EC'];
  genderList=['Male','Female','Other'];
  batches=[1,2];
  userTypes=['Student','Faculty','HOD','Dean','Principal'];
  deanLevels=['UG','PG','Research'];
  currentYear=new Date().getFullYear();
  yearList:Array<number>=[];
  showError=false;
  // year=new FormControl(moment());
  constructor(private fb:UntypedFormBuilder,private http:HttpClient,private router:Router,private apiService:ApiService) { }

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      admissionNo:new UntypedFormControl('',Validators.required),
      admissionYear:new UntypedFormControl('',Validators.required),
      admissionType:new UntypedFormControl('',Validators.required),
      reservation:new UntypedFormControl('',Validators.required),
      egrantz:new UntypedFormControl('',Validators.required),
      ktuId:new UntypedFormControl('',Validators.required),
      email:new UntypedFormControl('',[Validators.required,Validators.email]),
      phoneNumber:new UntypedFormControl('',Validators.required),
      gender:new UntypedFormControl('',Validators.required),
      dob:new UntypedFormControl('',Validators.required),
      annualIncome:new UntypedFormControl('',Validators.required),
      address:new UntypedFormControl('',Validators.required),
      cgpa:new UntypedFormControl('',Validators.required),
      numberOfBackPapers:new UntypedFormControl('',Validators.required),
      completionYear:new UntypedFormControl('',Validators.required),
      fatherName:new UntypedFormControl('',Validators.required),
      fatherPhone:new UntypedFormControl('',Validators.required),
      motherName:new UntypedFormControl('',Validators.required),
      motherPhone:new UntypedFormControl('',Validators.required),
      password:new UntypedFormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      name: new UntypedFormControl('',Validators.required),
      program: new UntypedFormControl('',Validators.required),
      semester:new UntypedFormControl('',Validators.required),
      branch: new UntypedFormControl('',Validators.required),
      department:new UntypedFormControl('',Validators.required),
      twelfthPercentage:new UntypedFormControl('',Validators.required),
      userType:new UntypedFormControl('',Validators.required),
      dateOfJoining:new UntypedFormControl('',Validators.required),
      batch:new UntypedFormControl('',Validators.required),
      levelOfDean:new UntypedFormControl('',Validators.required),
      programForHod:new UntypedFormControl('',Validators.required),
      departmentForHod:new UntypedFormControl('',Validators.required),
      programForStaffAdvisor:new UntypedFormControl(),
      batchForStaffAdvisor:new UntypedFormControl(),
      departmentForStaffAdvisor:new UntypedFormControl(),
      semesterForStaffAdvisor:new UntypedFormControl(),
    })


    this.department?.valueChanges.subscribe((res)=>{
      switch(res){
        case "Computer Science & Engineering":{
          this.branches=['CSE'];
          break;
        }
        case "Mechanical Engineering":{
          this.branches=['ME','IE'];
          break;
        }
        case "Electrical & Electronics Engineering":{
          this.branches=['EEE'];
          break;
        }
        case "Civil Engineering":{
          this.branches=['Civil'];
          break;
        }
        case "Electronics Engineering":{
          this.branches=['EC','AE'];
          break;
        }
        case "Architecture":{
          this.branches=['Arch'];
          break;
        }
        case "CETSOM":{
          this.branches=['Aaaa'];
          break;
        }
        case "Computer applications":{
          this.branches=['MCA'];
          break;
        }
      }
    })

    this.programForStaffAdvisor?.valueChanges.subscribe((res)=>{
      switch(res){
        case "B.Tech":{
          this.semesters=['S1','S2','S3','S4','S5','S6','S7','S8'];
          break;
        }
        case "M.Tech":{
          this.semesters=['S1','S2','S3','S4'];
          break;
        }
        case "B.Arch":{
          this.semesters=['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10'];
          break;
        }
        case "M.Arch":{
          this.semesters=['S1','S2','S3','S4'];
          break;
        }
        case "MPlan":{
          this.semesters=['S1','S2','S3','S4'];
          break;
        }
        case "MBA":{
          this.semesters=['S1','S2','S3','S4'];
          break;
        }
        case "Phd":{
          this.semesters=['S1','S2','S3','S4'];
          break;
        }
        case "MCA":{
          this.semesters=['S1','S2','S3','S4'];
          break;
        }
      }
    })

    for(var i=this.currentYear-10;i<this.currentYear+10;i++){
      this.yearList.push(i);
    }
  }

  get admissionNo(){
    return this.registerForm.get('admissionNo');
  }
  get admissionYear(){
    return this.registerForm.get('admissionYear');
  }
  get admissionType(){
    return this.registerForm.get('admissionType');
  }
  get reservation(){
    return this.registerForm.get('reservation');
  }
  get egrantz(){
    return this.registerForm.get('egrantz');
  }
  get ktuId(){
    return this.registerForm.get('ktuId');
  }
  get email(){
    return this.registerForm.get('email');
  }
  get phoneNumber(){
    return this.registerForm.get('phoneNumber');
  }
  get dob(){
    return this.registerForm.get('dob');
  }
  get income(){
    return this.registerForm.get('annualIncome');
  }
  get fatherName(){
    return this.registerForm.get('fatherName');
  }
  get fatherPhone(){
    return this.registerForm.get('fatherPhone');
  }
  get motherName(){
    return this.registerForm.get('motherName');
  }
  get motherPhone(){
    return this.registerForm.get('motherPhone');
  }
  get cgpa(){
    return this.registerForm.get('cgpa');
  }
  get numberOfBackPapers(){
    return this.registerForm.get('numberOfBackPapers');
  }
  get completionYear(){
    return this.registerForm.get('completionYear');
  }
  get address(){
    return this.registerForm.get('address');
  }
  get password(){
    return this.registerForm.get('password');
  }
  get name(){
    return this.registerForm.get('name');
  }
  get program(){
    return this.registerForm.get('program');
  }
  get semester(){
    return this.registerForm.get('semester');
  }
  get branch(){
    return this.registerForm.get('branch');
  }
  get department(){
    return this.registerForm.get('department');
  }
  get twelfthPercentage(){
    return this.registerForm.get('twelfthPercentage');
  }
  get role(){
    return this.registerForm.get('userType');
  }
  get annualIncome(){
    return this.registerForm.get('annualIncome');
  }
  get batch(){
    return this.registerForm.get('batch');
  }
  get batchForStaffAdvisor(){
    return this.registerForm.get('batchForStaffAdvisor');
  }
  get departmentForStaffAdvisor(){
    return this.registerForm.get('departmentForStaffAdvisor');
  }
  get semesterForStaffAdvisor(){
    return this.registerForm.get('semesterForStaffAdvisor');
  }
  get programForStaffAdvisor(){
    return this.registerForm.get('programForStaffAdvisor');
  }
  get dateOfJoining(){
    return this.registerForm.get('dateOfJoining');
  }
  get gender(){
    return this.registerForm.get('gender');
  }
  get programForHod(){
    return this.registerForm.get('programForHod')
  }
  get departmentForHod(){
    return this.registerForm.get('departmentForHod')
  }
  get levelOfDean(){
    return this.registerForm.get('levelOfDean');
  }


  login(){
    let d={};
    if(this.role?.value=='Student'){
      d={
        name:this.name?.value,
        email: this.email?.value,
        dob:this.dob?.value,
        gender:this.gender?.value,
        password: this.password?.value,
        admissionNo: this.admissionNo?.value,
        admissionYear:this.admissionYear?.value,
        admissionType:this.admissionType?.value,
        reservation:this.reservation?.value,
        egrantz:this.egrantz?.value,
        ktuId:this.ktuId?.value,
        program: this.program?.value,
        semester: this.semester?.value,
        branch: this.branch?.value,
        batch:this.batch?.value,
        address: this.address?.value,
        annualIncome: this.annualIncome?.value,
        phoneNumber: this.phoneNumber?.value,
        department: this.department?.value,
        twelfthPercentage: this.twelfthPercentage?.value,
        cgpa: this.cgpa?.value,
        numberOfBackPapers:this.numberOfBackPapers?.value,
        completionYear:this.completionYear?.value,
        fatherName:this.fatherName?.value,
        fatherPhone:this.fatherPhone?.value,
        motherName:this.motherName?.value,
        motherPhone:this.motherPhone?.value,
      }
      // console.log(d);
      // this.apiService.addUser(d,this.role.value).subscribe((res)=>{
      //   console.log(res);
      //   this.router.navigateByUrl("/login");
      // })
    }
    else if(this.role?.value=='Faculty'){
      d={
        employeeNo: this.admissionNo?.value,
        role: 0,
        name: this.name?.value,
        program:this.programForStaffAdvisor?.value,
        department: this.departmentForStaffAdvisor?.value,
        semester: this.semesterForStaffAdvisor?.value,
        batch:this.batchForStaffAdvisor?.value,
        password: this.password?.value,
        phoneNumber: this.phoneNumber?.value,
        dateOfJoining: this.dateOfJoining?.value,
        gender:this.gender?.value,
        ktuId:this.ktuId?.value
      }

      // console.log(d);
      // this.http.post('https://certificate-automation-backend.vercel.app/register/Faculty',d).subscribe((res)=>{
      //   console.log(res);
      //   this.router.navigateByUrl("/login");
      // })

    }
    else if(this.role?.value=='HOD'){
      d={
        employeeNo: this.admissionNo?.value,
        role: 1,
        name: this.name?.value,
        program:this.programForHod?.value,
        department: this.departmentForHod?.value,
        password: this.password?.value,
        phoneNumber: this.phoneNumber?.value,
        dateOfJoining: this.dateOfJoining?.value,
        gender:this.gender?.value,
        ktuId:this.ktuId?.value
      }

      // console.log(d);
      // this.http.post('https://certificate-automation-backend.vercel.app/register/Faculty',d).subscribe((res)=>{
      //   console.log(res);
      //   this.router.navigateByUrl("/login");
      // })

    }
    else if(this.role?.value=='Dean'){
      d={
        employeeNo: this.admissionNo?.value,
        name: this.name?.value,
        password: this.password?.value,
        phoneNumber: this.phoneNumber?.value,
        dateOfJoining: this.dateOfJoining?.value,
        level:this.levelOfDean?.value
      }

      // console.log(d);
      // this.http.post('https://certificate-automation-backend.vercel.app/register/'+this.role?.value,d).subscribe((res)=>{
      //   console.log(res);
      //   this.router.navigateByUrl("/login");
      // })
    }
    else{
      d={
        employeeNo: this.admissionNo?.value,
        name: this.name?.value,
        password: this.password?.value,
        phoneNumber: this.phoneNumber?.value,
        dateOfJoining: this.dateOfJoining?.value,
      }

      // console.log(d);
      // this.http.post('https://certificate-automation-backend.vercel.app/register/'+this.role?.value,d).subscribe((res)=>{
      //   console.log(res);
      //   this.router.navigateByUrl("/login");
      // })
    }
    console.log(d);
    this.apiService.addUser(d,this.role?.value).subscribe((res)=>{
        console.log(res);
        this.router.navigateByUrl("/login");
    })
  }

}
