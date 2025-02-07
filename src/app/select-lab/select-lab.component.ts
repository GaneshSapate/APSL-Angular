import { Component, OnInit } from '@angular/core';
import { LabObj } from '../Model/LabObj';
import { LabServiceService } from '../service/lab-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-lab',
  templateUrl: './select-lab.component.html',
  styleUrls: ['./select-lab.component.css']
})
export class SelectLabComponent implements OnInit {

  labList=[<LabObj>{}];
  userId = <number> new Number(sessionStorage.getItem("mid"));
  labId:string="";
  constructor(private labService: LabServiceService,
                  private router:Router) { }

  ngOnInit(): void {

    this.labService.getLabsByUserId(this.userId).subscribe(
      (r)=>{
        this.labList=<any>r;
      })
  }

  onNext(){
    sessionStorage.setItem("labId",this.labId);
    this.router.navigate(["/dashboard/home"]); 
  }

}
