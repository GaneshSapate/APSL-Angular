import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  darkFlag:boolean=false;
  mode:any=this.document.querySelector('html')?.getAttributeNode('data-bs-theme')

  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
    this.useThemeDetector();
  }

  lightMode() {
    this.darkFlag=!this.darkFlag;
    this.mode.value='light';
  }
  darkMode() {
    this.darkFlag=!this.darkFlag;
    this.mode.value='dark';
  }

  useThemeDetector(){
    const value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if(value){
     this.darkMode();
    }
   }

}
