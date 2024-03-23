import { Component, OnInit ,ViewChild,} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dean-dashboard',
  templateUrl: './dean-dashboard.component.html',
  styleUrls: ['./dean-dashboard.component.css']
})
export class DeanDashboardComponent implements OnInit {
  sectionName:any;
  spinner=true;

  @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
  constructor(private observer: BreakpointObserver,public router:Router) { }

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
}
