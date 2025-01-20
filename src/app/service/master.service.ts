import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  public onProjectChange = new Subject();
  public onTicketCreate = new Subject();

  private baseurl = 'api/Jira/';

  constructor(private http: HttpClient) {}

  // POST: Verify User
  verifyUser(obj: any): Observable<any> {
    return this.http.post(`${this.baseurl}Login`, obj);
  }

  // GET: Fetch All Users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseurl}GetAllUsers`);
  }
  getAllProjects(): Observable<any>{
    return this.http.get(this.baseurl+'GetAllProjects');
  }
  createProjects(obj:any):Observable<any>{
    return this.http.post(this.baseurl+'CreateProject',obj);
  }
  createUser(obj:any):Observable<any>{
    return this.http.post(this.baseurl+'CreateUser',obj);
  }
  createTicket(obj:any):Observable<any>{
    return this.http.post(this.baseurl+'CreateTicket',obj);
  }
  getTicketByProjectId(id:any):Observable<any>{
    return this.http.get(this.baseurl+'GetTicketsByProjectId?projectid='+id);
  }
}



