import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

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
}



