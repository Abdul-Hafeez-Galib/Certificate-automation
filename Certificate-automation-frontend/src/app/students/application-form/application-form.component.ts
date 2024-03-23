import { HttpClient } from '@angular/common/http';
import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { EmailValidator, UntypedFormBuilder,UntypedFormControl,UntypedFormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AlertComponent} from '../../alert/alert.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import domToImage from 'dom-to-image';
import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { image } from 'html2canvas/dist/types/css/types/image';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/api.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const htmlToPdfmake=require("html-to-pdfmake");

export enum CertificateTypes{
  bonafide=1,
  feestructure=2,
  promotion=3,
  gpatopercentage=4,
  mediumofinstruction=5

}

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  inputValue: string | undefined;
  applicationForm!:UntypedFormGroup;
  certificates:any=[];
  appliedForms:any=[];
  templateData:any=[];
  userData:any;
  userId:any;
  scholarships=['MCM','Post Matric','Pragathi','Hope Plus','MEA','FFE','Muthoot M George Higher Education','Egrantz'];

  @ViewChild('dataToExport', { static: false }) public dataToExport!: ElementRef;
  constructor(private fb:UntypedFormBuilder,private http:HttpClient,private dialog:MatDialog,private apiService:ApiService) { }

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
      applyOrRenewal:new UntypedFormControl(''),
      specificFormat:new UntypedFormControl(false),
      photoInFormat:new UntypedFormControl(''),
      branch:new UntypedFormControl('',Validators.required),
      batch:new UntypedFormControl('',Validators.required),
      phoneNumber:new UntypedFormControl('',Validators.required),
      email:new UntypedFormControl('',Validators.required),
      signature:new UntypedFormControl('',Validators.required)
    })

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

    if(this.userData){
      this.applicationForm.get('name')?.setValue(this.userData.name);
      this.applicationForm.get('program')?.setValue(this.userData.program);
      this.applicationForm.get('semester')?.setValue(this.userData.semester);
      this.applicationForm.get('scholarship')?.setValue(this.userData.scholarship);
      this.applicationForm.get('admissionNo')?.setValue(this.userData.admissionNo);
      this.applicationForm.get('regNo')?.setValue(this.userData.ktuId);
      this.applicationForm.get('branch')?.setValue(this.userData.branch);
      this.applicationForm.get('batch')?.setValue(this.userData.batch);
    }

    this.http.get('https://certificate-automation-backend.vercel.app/getAppliedForms/'+this.userData._id).subscribe((data:any)=>{
      this.appliedForms=data;
      console.log(data);
    })
  }

  sendForm(){
    if(this.applicationForm.get('bonaFide')?.value)
      this.certificates.push("Bonafide");
    if(this.applicationForm.get('feeStructure')?.value)
      this.certificates.push("Fee Structure");
    if(this.applicationForm.get('promotion')?.value)
      this.certificates.push("Promotion");
    if(this.applicationForm.get('gpaToPercentage')?.value)
      this.certificates.push("GPA to Percentage");
    if(this.applicationForm.get('mediumOfInstruction')?.value)
      this.certificates.push("Medium Of Instruction");
    if(this.applicationForm.get('otherCertificates')?.value){
      this.certificates.push(this.applicationForm.get('otherCertificates')?.value);
    }

    let data={
      ...this.applicationForm.value,
      certificateType:this.certificates,
      status:"Under Review by Staff Advisor",
      from:this.userId,
      to:this.userData.staffAdvisor,
      studentId:this.userId
    }

    this.http.post('https://certificate-automation-backend.vercel.app/apply',data).subscribe((res)=>{
      console.log(res);
      this.dialog.open(AlertComponent,{
        width: '250px',
        data: {
          title: 'Alert',
          message: 'Success!'
        }
      })
    })
    console.log(this.certificates);
  }

  viewStatus(msg:any){

    this.dialog.open(AlertComponent,{
        width: '400px',
        data: msg
    })
  }

  download(form:any){
//     let html=`
//     <!DOCTYPE html>
// <html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="">
// <head>
// <title></title>
// <style type="text/css">
//   body{
//     width:900px;
//     height:1000px;
//   }
// 	p{margin: 0; padding: 0;}	.ft10{font-size:6px;font-family:Times;color:red;}
// 	.ft11{font-size:17px;font-family:Times;color:#000000;}
// 	.ft12{font-size:13px;font-family:Helvetica;color:#000000;}

// </style>
// </head>
// <body bgcolor="#A0A0A0" vlink="blue" link="blue">
// <div id="page1-div" style="position:relative;width:850px;height:999px;">
// <p style="position:absolute;top:163px;left:170px;white-space:nowrap" class="ft10">BONAFIDE&#160;CERTIFICATE&#160;FROM&#160;THE&#160;HEAD&#160;OF&#160;INSTITUTION/SCHOOL&#160;</p>
// <p style="position:absolute;top:190px;left:459px;white-space:nowrap" class="ft10">&#160;</p>
// <p style="position:absolute;top:217px;left:108px;white-space:nowrap" class="ft10">&#160;</p>
// <p style="position:absolute;top:217px;left:162px;white-space:nowrap" class="ft10">This&#160;&#160;is&#160;&#160;to&#160;&#160;certify&#160;&#160;that&#160;&#160;Master/Baby/Mr./Miss.&#160;&#160;__${this.userData.name}__&#160;&#160;Roll&#160;</p>
// <p style="position:absolute;top:245px;left:108px;white-space:nowrap" class="ft10">No………………………&#160;&#160;Admission&#160;&#160;No.&#160;&#160;……………….&#160;&#160;Son&#160;&#160;of&#160;&#160;Sri/Smt.&#160;&#160;…………………………………….&#160;&#160;is&#160;&#160;a&#160;</p>
// <p style="position:absolute;top:272px;left:108px;white-space:nowrap" class="ft10">bonafide&#160;&#160;student&#160;&#160;of&#160;&#160;this&#160;&#160;school&#160;&#160;and&#160;&#160;studied&#160;&#160;in&#160;&#160;Class&#160;&#160;____${this.userData.branch}_____&#160;&#160;during&#160;&#160;the&#160;&#160;financial&#160;&#160;year&#160;</p>
// <p style="position:absolute;top:299px;left:108px;white-space:nowrap" class="ft10">………………..&#160;&#160;and&#160;&#160;as&#160;&#160;per&#160;&#160;School&#160;&#160;records&#160;&#160;his/her&#160;&#160;date&#160;&#160;of&#160;&#160;birth&#160;&#160;is&#160;&#160;………………………..&#160;&#160;in&#160;&#160;words&#160;</p>
// <p style="position:absolute;top:327px;left:108px;white-space:nowrap" class="ft10">………………………………&#160;…………………………………………………………………..&#160;&#160;</p>
// <p style="position:absolute;top:354px;left:108px;white-space:nowrap" class="ft10">&#160;</p>
// <p style="position:absolute;top:354px;left:162px;white-space:nowrap" class="ft10">&#160;</p>
// <p style="position:absolute;top:381px;left:108px;white-space:nowrap" class="ft10">This&#160;is&#160;to&#160;also&#160;certify&#160;that&#160;the&#160;above&#160;named&#160;child&#160;had&#160;studied&#160;in&#160;this&#160;School&#160;in&#160;the&#160;previous&#160;</p>
// <p style="position:absolute;top:409px;left:108px;white-space:nowrap" class="ft10">academic&#160;year&#160;………………………..&#160;</p>
// <p style="position:absolute;top:436px;left:108px;white-space:nowrap" class="ft10">&#160;</p>
// <p style="position:absolute;top:436px;left:162px;white-space:nowrap" class="ft10">He/She&#160;bears&#160;a&#160;good&#160;moral&#160;character.&#160;</p>
// <p style="position:absolute;top:463px;left:108px;white-space:nowrap" class="ft10">&#160;</p>
// <p style="position:absolute;top:491px;left:108px;white-space:nowrap" class="ft10">**&#160;&#160;During&#160;&#160;the&#160;&#160;year&#160;&#160;Master/Baby/Mr./Miss.&#160;&#160;…………………………………………….had&#160;&#160;resided&#160;&#160;in&#160;&#160;the&#160;</p>
// <p style="position:absolute;top:518px;left:108px;white-space:nowrap" class="ft10">residential&#160;&#160;complex&#160;&#160;(Hostel)&#160;&#160;of&#160;&#160;the&#160;&#160;school&#160;&#160;and&#160;&#160;paid&#160;&#160;an&#160;&#160;amount&#160;&#160;of&#160;&#160;Rs………………………………&#160;</p>
// <p style="position:absolute;top:546px;left:108px;white-space:nowrap" class="ft10">toward&#160;boarding&#160;and&#160;lodging&#160;in&#160;the&#160;residential&#160;complex.&#160;</p>
// <p style="position:absolute;top:573px;left:108px;white-space:nowrap" class="ft10">&#160;</p>
// <p style="position:absolute;top:600px;left:108px;white-space:nowrap" class="ft10">This&#160;institution/School&#160;is&#160;affiliated&#160;recognized&#160;by&#160;…………………………………………&#160;………………….&#160;And&#160;</p>
// <p style="position:absolute;top:627px;left:108px;white-space:nowrap" class="ft10">affiliation/recognition&#160;number&#160;is&#160;……………………………..&#160;</p>
// <p style="position:absolute;top:655px;left:108px;white-space:nowrap" class="ft10">&#160;</p>
// <p style="position:absolute;top:682px;left:108px;white-space:nowrap" class="ft10">Dated&#160;:&#160;&#160;</p>
// <p style="position:absolute;top:710px;left:108px;white-space:nowrap" class="ft10">Place&#160;&#160;:&#160;</p>
// <p style="position:absolute;top:737px;left:541px;white-space:nowrap" class="ft10">Signature&#160;Head&#160;of&#160;the&#160;</p>
// <p style="position:absolute;top:764px;left:557px;white-space:nowrap" class="ft10">Institution/School&#160;</p>
// <p style="position:absolute;top:792px;left:539px;white-space:nowrap" class="ft10">(with&#160;Stamp&#160;and&#160;Seal)&#160;</p>
// <p style="position:absolute;top:819px;left:108px;white-space:nowrap" class="ft10">&#160;</p>
// <p style="position:absolute;top:846px;left:108px;white-space:nowrap" class="ft10">**&#160;(Strike&#160;out&#160;it&#160;is&#160;not&#160;applicable).&#160;</p>
// <p style="position:absolute;top:351px;left:107px;white-space:nowrap" class="ft12">The certificate is issued on the student's request for the purpose of scholarship application.</p>
// </div>
// </body>
// </html>


// `
    // let doc=new jsPDF('p', 'mm', 'a4');
    // doc.html(html);


    // doc.save("new.pdf");
    // var htmlt = htmlToPdfmake(html);
    // const documentDefinition = { content: htmlt };
    // pdfMake.createPdf(documentDefinition).download();
    // let data=document.createElement('div');
    // data.innerHTML=html;
    // html2canvas(data).then(canvas => {

    //   var imgWidth = 208;
    //   var pageHeight = 295;
    //   var imgHeight = canvas.height * imgWidth / canvas.width;
    //   var heightLeft = imgHeight;
    //   const contentDataURL = canvas.toDataURL('image/png')
    //   let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    //   var position  = 0;
    //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
    //   pdf.save('new-file.pdf');
    // });
    // let link=document.createElement('a');
    // link.download="Bonafide.pdf";
    // link.href=html;
    // link.click();


    // const width = this.dataToExport.nativeElement.clientWidth;
    // const height = this.dataToExport.nativeElement.clientHeight + 40;
    // let orientation = "";
    // let imageUnit = 'pt';
    // if (width > height) {
    //   orientation = "l";
    // } else {
    //   orientation = "p";
    // }
    // domToImage.toPng(this.dataToExport.nativeElement, {width: width,height: height}).then(result => {
    //   let jsPdfOptions = {orientation: orientation,unit: imageUnit,format: [width + 50, height + 220]};
    //   const pdf = new jsPDF();
    //   pdf.setFontSize(24);
    //   pdf.setTextColor('#2585fe');
    //   pdf.text('Bonafide'.toUpperCase(), 25, 75);
    //   pdf.setFontSize(24);
    //   pdf.setTextColor('#131523');
    //   pdf.text('Report date: ' + moment().format('ll'), 25, 115);
    //   pdf.addImage(result, 'PNG', 25, 85, width, height);
    //   pdf.save('file_name'+ '.pdf');
    // }).catch(error => {});

      const pdf = new jsPDF();
      // pdf.setFontSize(24);
      // pdf.setTextColor('#2585fe');
      // pdf.text('Bonafide'.toUpperCase(), 25, 75);
      pdf.setFontSize(14);
      pdf.setTextColor('#131523');
      form.certificateType.map((x:string)=>{
        console.log(x);
        let typeValue=0;
        switch(x.toLowerCase()){
          case "bonafide":{
            typeValue=CertificateTypes.bonafide;
            break;
          }
          case "feestructure":{
            typeValue=CertificateTypes.feestructure;
            break;
          }
          case "promotion":{
            typeValue=CertificateTypes.promotion;
            break;
          }
          case "gpatopercentage":{
            typeValue=CertificateTypes.gpatopercentage;
            break;
          }
          case "mediumofinstruction":{
            typeValue=CertificateTypes.mediumofinstruction;
            break;
          }
        }
        this.apiService.getTemplate(typeValue).subscribe((result:any)=>{
          console.log(result);
          pdf.addImage("../"+result.data.src,'PNG', 0, 0, 200,300);
      // pdf.text('Report date: ' + moment().format('ll'), 25, 115);
          pdf.text(`${this.userData.name}`,result.data.information.name.x,result.data.information.name.y);
          pdf.text(`${this.userData.admissionNo}`,result.data.information.admissionNo.x,result.data.information.admissionNo.y);
          pdf.text(`${this.userData.ktuId}`,result.data.information.ktuId.x,result.data.information.ktuId.y);
          pdf.text(`${this.userData.semester}`,result.data.information.semester.x,result.data.information.semester.y);
          pdf.text(`${this.userData.department}`,result.data.information.department.x,result.data.information.department.y);
          pdf.text(`${this.userData.duration}`,result.data.information.duration.x,result.data.information.duration.y);
          pdf.text(`${this.userData.program}`,result.data.information.program.x,result.data.information.program.y);
          pdf.text(`${this.userData.admissionYear}`,result.data.information.admissionYear.x,result.data.information.admissionYear.y);
          pdf.text(`${this.userData.completionYear}`,result.data.information.completionYear.x,result.data.information.completionYear.y);
          pdf.save(x+ '.pdf');
        })
      })
      
  }
}
