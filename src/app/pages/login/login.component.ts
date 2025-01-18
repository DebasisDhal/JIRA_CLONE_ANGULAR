import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { JsonPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  service = inject(MasterService);
  Users:any;
  formValue : any;
 
  constructor(private route:Router){
    
  }

  ngOnInit(): void {
   
   // this.allUser();
    this.formValue = this.loginObj;
  }



  loginObj:any ={
    userId: 0,
    emailId: "",
    fullName: "test",
    password: ""
  }

  onLogin(){
    debugger;
    this.service.verifyUser(this.formValue).subscribe((res:any)=>{

      if(res.message == 'User Found Successfully'){ //Api res come wrong so i do this type  but you use like res.result
        localStorage.setItem('jiraLoginDetails', JSON.stringify(res.data))
        this.route.navigateByUrl("board");
      }else{
        alert(res.message)
      }

    })
  }

  allUser(){
    this.service.getAllUsers().subscribe((res:any)=>{
      this.Users = res.data;
      console.log(res.data)
    })
  }

}
