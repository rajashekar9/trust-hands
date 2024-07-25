import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';

// const AUTH_API = 'http://localhost:8080/api/auth/';
import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword } from 'firebase/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth: Auth
  constructor(private http: HttpClient) {
    this.auth = getAuth();
  }

  login(email: string, password: string): Observable<any> {
    return from(this.createUser(email, password, false));
  }

  register(username: string, email: string, password: string): Observable<any> {
    return from(this.createUser(email, password, true));
  }

  logout(): Observable<any> {
    return from(this.signOutUser());
  }

  private signOutUser() {
    return new Promise((resolve, reject) => {
      this.auth.signOut().then(res => {
        console.log('Loggedout successfully:', res);
        resolve('Loggedout successfully:');
      }).catch(err => {
        console.log('Error while logging out:', err);
        reject()
      })
    })
  }

  private createUser(email: string, password: string, register: Boolean) {
    return new Promise((resolve, reject) => {
      let signInUser = register ? createUserWithEmailAndPassword : signInWithEmailAndPassword;
      signInUser(this.auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(`User ${register ? 'registered' : 'signed in'} successfully::`, user);
          resolve(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error('Error while registering the user::', errorMessage);
          reject({errorCode, errorMessage});
        });
    })
  }
}
