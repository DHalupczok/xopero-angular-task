import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs'
import {environment} from '../../environments/environment';
import {UserModel} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = `${environment.restApiURL}/users`;
  private http = inject(HttpClient)

  constructor() {
  }

  getUsers(filter?: string, page?: number, pageSize?: number, sort?: string): Observable<UserModel[]> {
    let params = new HttpParams();
    if (filter) params = params.set('filter', filter);
    if (page) params = params.set('page', page.toString());
    if (pageSize) params = params.set('pageSize', pageSize.toString());
    if (sort) params = params.set('sort', sort);

    return this.http.get(this.apiURL, {params}).pipe(map((res: any) => res.results), catchError(err => {
      console.error(err)
      return of([]);
    }));
  }

  getUser(id: string) {
    return this.http.get<UserModel | null>(`${this.apiURL}/${id}`).pipe(catchError(err => {
      console.error(err)
      return of(null)
    }));
  }
}
