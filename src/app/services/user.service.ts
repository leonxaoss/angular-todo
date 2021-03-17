import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>('http://localhost:3000/todo');
  }
  getUserById(id: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(`http://localhost:3000/todo/${id}`);
  }

  addUser(data: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>(`http://localhost:3000/todo`, data);
  }

  updateUser(id: number, data: UserInterface): Observable<null> {
    return this.http.put<null>(`http://localhost:3000/todo/${id}`, data);
  }

  deleteUser(id: number): Observable<null> {
    return this.http.delete<null>(`http://localhost:3000/todo/${id}`);
  }
}
