import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //FIXME apiURL should be taken from env variables
  private apiURL = 'http://localhost:9333/users';
  //TODO think about using inject() function instead of constructor based DI
  constructor(private http: HttpClient) { }

   //Fixme Please avoid using any - create a model for response type
  getUsers(filter?: string, page?: number, pageSize?: number, sort?: string): Observable<any> {
    //FIXME instead of using string concatenation it is better to use HttpParams object
    let url = `${this.apiURL}?`;
    if (filter) url += `filter=${filter}&`;
    if (page) url += `page=${page}&`;
    if (pageSize) url += `pageSize=${pageSize}&`;
    if (sort) url += `sort=${sort}&`;
    //Todo think about error handling
    return this.http.get(url).pipe(map((res: any) => res.results));
  }
  //FIXME Please use return type for http.get so there will be somethink more concrete than <OBJECT>
  getUser(id: string) {
    //TODO think about error handling
    return this.http.get(`${this.apiURL}/${id}`)
  }
}
