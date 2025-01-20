import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit{
  service = inject(MasterService)
  ticketArray:any[]=[];
  status:string[] = ['To Do', 'In-progress', 'Done' ];
  selectedProjectData!:any;

  constructor(){
   
    this.service.onProjectChange.subscribe((res:any)=>{
      debugger;
      this.getTicket(res.projectId);
      this.selectedProjectData = res;
    })
    this.service.onTicketCreate.subscribe((res:any)=>{
      this.getTicket(this.selectedProjectData.projectId);
    })
  }

  ngOnInit(): void {
    
  }
  getTicket(data:any){
    
    this.service.getTicketByProjectId(data).subscribe((Re:any)=>{
      this.ticketArray = Re.data;
    })
  }
  filterTicket(status:string){   //Filter out multiple data to working data
    return this.ticketArray.filter(m=>m.status == status)
    console.log(status);
  }

}
