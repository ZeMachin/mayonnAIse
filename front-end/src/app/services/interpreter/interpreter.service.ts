import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DTO } from 'src/model/dto.model';

@Injectable({
  providedIn: 'root'
})
export class InterpreterService {

  constructor(private _http: HttpClient) { }

  query(query: string): Promise<any> {
    const url = '/api/interpreter';
    const body: string = JSON.stringify({ query: query });
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    const options = { headers };
    return firstValueFrom(
      this._http.post<DTO>(url, body, options)
    )
    .then((result) => result);
  }
}
