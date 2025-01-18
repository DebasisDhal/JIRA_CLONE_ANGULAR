import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  service = inject(MasterService);
  projectList: any[] = [];
  shortName: string = '';
  longName: string = '';

  ngOnInit(): void {
    this.onProject();
  }
  
  onProject(){
    this.service.getAllProjects().subscribe((res:any)=>{
      this.projectList = res.data;
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
"projectId": 0,
  "projectName": "",
  "shortName": "",
  "createdDate": new Date()
};

onSaveProjct(){
  return this.service.createProjects(this.projectObj).subscribe((res)=>{
    if(res.message){
      alert(res.message)
      this.onProject();
      this.closeModal();
      this.projectObj={    //It is help to clear the form after submit fully blank
          "projectId": 0,
          "projectName": "",
          "shortName": "",
          "createdDate": new Date()
        };
    }else{
     alert( res.message);
    }
  })
}
}
