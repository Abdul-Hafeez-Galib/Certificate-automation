import { Component, OnInit ,ViewChild,} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ApiService } from 'src/api.service';
import { ViewUploadErrorsComponent } from 'src/app/view-upload-errors/view-upload-errors.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dean-dashboard',
  templateUrl: './staff-advisor-dashboard.component.html',
  styleUrls: ['./staff-advisor-dashboard.component.css']
})
export class StaffAdvisorDashboardComponent implements OnInit {
  sectionName:any;
  uploading=false;
  uploadedNumber=0;
  totalStudentData=0;
  uploadingError=0;
  studentDataFromCsv:Array<any>=[];
  errorList:Array<any>=[];
  spinner=true;

  @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
  constructor(private observer: BreakpointObserver,public router:Router,private apiService:ApiService,private snackbar:MatSnackBar,private dialog:MatDialog) { }

  ngOnInit(): void {

    this.sectionName='profile';
    setTimeout(()=>{
      this.spinner=false;
    },3000);
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  change(){
    this.router.navigate(['/side/donate']);
  }

  selectTab(tab:any){
    this.sectionName=tab;
  }

  upload(){
    document.getElementById("upload")?.click();
  }

  fileRetrieve(ev:any){
    const files = ev.target.files;
    this.uploading=true;
    console.log(files);
    if(files && files.length>0){
      let file:File=files[0];
      let csvarray:Array<any>;
      let reader:FileReader=new FileReader();
      reader.readAsText(file);
      reader.onload=(e)=>{
        let csv:string=reader.result as string;
        let csvarray=(<string>csv).split(/\r\n|\n/);
        this.totalStudentData=csvarray.length - 1;
        console.log(csvarray);
        var headers=csvarray[0].split(',');
        for(var i=1;i<csvarray.length;i++){
          var item=csvarray[i].split(',');
          var csvObject:any={};
          for(var j=0;j<headers.length;j++){
            csvObject[headers[j]]=item[j];
          }
          var check=0;
          // for(var j=0;j<headers.length;j++){
          //   if(csvObject[headers[j]]==""){
          //     this.totalStudentData--;
          //     check=1;
          //     break;
          //   }
          // }
          // if(check==0){
            csvObject["userType"]="student";
            csvObject["password"]=`Student@${csvObject.admissionNo}`
            this.studentDataFromCsv.push(csvObject);
          // }

        }

        this.studentDataFromCsv.map(studentData=>{
          this.apiService.addUser(studentData,"Student").subscribe((result)=>{
            console.log(result);
            this.uploadedNumber++;
          },(err)=>{
            this.uploadingError++;
            let errorBody={
              name:studentData.name,
              id:studentData.ktuId,
              admissionNo:studentData.admissionNo,
              message:err.error.message
            }
            this.errorList.push(errorBody);
            this.snackbar.open(`${this.uploadingError} errors while uploading`,"View Details",{
              duration: 6000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: ['custom-snackbar']
            }).onAction().subscribe(()=>{
              console.log(this.errorList);
              this.dialog.open(ViewUploadErrorsComponent,{
                  width: '450px',
                  height:'450px',
                  data: this.errorList
              })
            });
          })
        })
        console.log(this.studentDataFromCsv);
      }

    }
    // Parse the file you want to select for the operation along with the configuration
    // this.ngxCsvParser
    //   .parse(files[0], { header: false, delimiter: "," })
    //   .pipe()
    //   .subscribe(
    //     (result: any) => {
    //       console.log("Result", result);
    //       // this.csvRecords = result;
    //     },
    //     (error: NgxCSVParserError) => {
    //       console.log("Error", error);
    //     }
    //   );
  }

  downloadCSV(){
    const a = document.createElement('a');
    a.href = "../../../assets/Certificate-Automation-Student-data.csv";
    a.download = 'data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
