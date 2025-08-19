import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs'
import {environment} from '../../environments/environment';
import {UserModel} from '../models/user.model';

interface UsersResponse {
  results: UserModel[]
  page: number,
  pageSize: number,
  total: number
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = `${environment.restApiURL}/users`;
  private http = inject(HttpClient)

  constructor() {
  }

  getUsers(filter?: string, page?: number, pageSize?: number, sort?: string): Observable<UsersResponse> {
    let params = new HttpParams();
    if (filter) params = params.set('filter', filter);
    if (page) params = params.set('page', page.toString());
    if (pageSize) params = params.set('pageSize', pageSize.toString());
    if (sort) params = params.set('sort', sort);

    return this.http.get<UsersResponse>(this.apiURL, {params}).pipe(
      catchError(error => {
        console.error(error)
        return of({results: [], page: 0, pageSize: 0, total: 0})
      })
    )
  }

  getUser(id: string) {
    return this.http.get<UserModel | null>(`${this.apiURL}/${id}`).pipe(catchError(err => {
      console.error(err)
      return of(null)
    }));
  }
}
