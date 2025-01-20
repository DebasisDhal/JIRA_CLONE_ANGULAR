import { afterNextRender, Component, Inject, inject, InjectionToken, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';




@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  service = inject(MasterService)
  userList:any[] =[];
  projectList: any[] = [];
  issueType:string[] = ['Ticket','Defect','RnD Work'];
  status:string[] = ['To Do', 'In-progress', 'Done' ];
  ticketObj = {
    "ticketId": 0,
    "createdDate": new Date,
    "summary": "",
    "status": " ",
    "description": "",
    "parentId": 0,
    "storyPoint": 0,
    "ticketGuid": "",
    "assignedTo": 0,
    "createdBy": 0,
    "projectId": 0
  }


  constructor() {
    afterNextRender(() => {
  
      const loginData = localStorage.getItem('jiraLoginDetails');
      if (loginData!= null) {
        try {
            const parserData = JSON.parse(loginData);
            this.ticketObj.createdBy = parserData.userId;
            console.log("user",loginData)
        }
        catch (err) {
        }
      }
    });
  }

  ngOnInit(): void {
    this.allUser();
    this.allProject();
  }
  allUser(){
    this.service.getAllUsers().subscribe((res)=>{
      
      this.userList = res.data
    })
  }
  allProject(){
    this.service.getAllProjects().subscribe((res)=>{
      this.projectList = res.data;
      this.service.onProjectChange.next(this.projectList[0]);
      
    })
  }
  onCreateTicket(){
    this.service.createTicket(this.ticketObj).subscribe((res:any)=>{
      if(res.result){
        alert(res.message);
        this.service.onTicketCreate.next(true);
      }else{
        alert(res.message)
      }
    })
  }

  setProject(data:any){  
    this.service.onProjectChange.next(data);

  }
}
