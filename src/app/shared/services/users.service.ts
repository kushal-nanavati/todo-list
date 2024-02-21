import { Injectable } from "@angular/core";
import { AccessToken, LoggedInUsers, RegisteredUsers } from "../models/users.model";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiConstants } from "../constants/api.constants";

@Injectable({
    'providedIn': 'root'
})
export class UsersService {
    isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    authenticatedUser$: BehaviorSubject<LoggedInUsers> = new BehaviorSubject<LoggedInUsers>(null);
    constructor(private http: HttpClient){}

    postUser(user: RegisteredUsers): Observable<number[]> {      
        return this.http.post<number[]>(ApiConstants.postUser(), user, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        });
    }

    validateUser(user: LoggedInUsers): Observable<AccessToken> {
        return this.http.post<AccessToken>(ApiConstants.postLoggedUser(), user, {
            headers: new HttpHeaders().set('Content-Type','application/json')
        }).pipe(tap((response: AccessToken) => {
                console.log(response.token);                
                this.isAuthenticated$.next(true);
                this.authenticatedUser$.next(user);            
        }));
    }
}