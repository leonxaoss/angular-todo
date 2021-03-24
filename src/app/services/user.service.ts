import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { UserInterface } from '../interfaces/user-interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private store: AngularFirestore) { }

  getAllUsers(): Observable<any> {
    return this.store.collection('users').valueChanges({ idField: 'id' });
  }
  getUserById(id: string): Observable<any> {
    return this.store.collection('users').doc(id).get().pipe(
      map(doc => doc.data())
    );
  }

  addUser(data: UserInterface): Observable<any> {
    return from(this.store.collection('users').add(data));
  }

  updateUser(id: string, data: UserInterface): Observable<any> {

    return from(this.store.collection('users').doc(id).update(data));
  }

  deleteUser(id: string): Observable<any> {
    return from(this.store.collection('users').doc(id).delete());
  }
}
