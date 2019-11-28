
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {

   constructor(private http: HttpClient) {
    }

    public getUsers(): Observable<any> {
        return this.http.get('../../content/users.json');
    }
}

