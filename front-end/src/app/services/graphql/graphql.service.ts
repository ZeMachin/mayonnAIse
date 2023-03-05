import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private _http: HttpClient) {}

  query(query: string): Promise<string> {
    const url = '/api/graphql';
    const body: string = JSON.stringify({ query: '{' + query + '}' });
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const options = { headers };
    return firstValueFrom(
      this._http.post<{ data: any }>(url, body, options)
    ).then((result) => result.data[query]);
  }
}
