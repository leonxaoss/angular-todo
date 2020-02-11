import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormInterface } from '../interfaces/form-interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<FormInterface[]> {
    return this.http.get<FormInterface[]>('http://localhost:3000/todo');
  }
  getById(id: number): Observable<FormInterface> {
    return this.http.get<FormInterface>(`http://localhost:3000/todo/${id}`);
  }

  addData(data: FormInterface): Observable<FormInterface> {
    return this.http.post<FormInterface>(`http://localhost:3000/todo`, data);
  }

  updateNode(id: number, data: FormInterface): Observable<null> {
    return this.http.put<null>(`http://localhost:3000/todo/${id}`, data);
  }

  deleteNode(id: number): Observable<null> {
    return this.http.delete<null>(`http://localhost:3000/todo/${id}`);
  }
}
