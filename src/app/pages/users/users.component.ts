import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
 service = inject(MasterService);
 userList: any[] = [];
  shortName: string = '';
  longName: string = '';

  ngOnInit(): void {
    this.onUser();
  }
  
onUser(){
  this.service.getAllUsers().subscribe((res:any)=>{
    this.userList = res.data;
  })
}


  openModal(){
    const modal = document.getElementById('myModal');
   if(modal){
       modal.style.display = 'block'
    }
}
closeModal(){
  const modal = document.getElementById('myModal')
  if(modal){
    modal.style.display='none'
  }
}

projectObj:any ={
    "userId": 0,
    "emailId": "",
    "fullName": "",
    "password": ""
  };

onSaveUser(){
 this.service.createUser(this.projectObj).subscribe((res)=>{
    if(res.message){
      alert(res.message)
      this.onUser();
      this.closeModal();
      this.projectObj={    //It is help to clear the form after submit fully blank
        "userId": 0,
        "emailId": "",
        "fullName": "",
        "password": ""
        };
    }else{
     alert( res.message);
    }
  })
}
}

