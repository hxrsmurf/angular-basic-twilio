import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {


  setHeaders() {
    const base64API = btoa(environment.apiUser + ':' + environment.apiKey)
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + base64API
    }
    const results = {
      base64API: base64API,
      headers: headers
    }

    return results
  }
  constructor() { }
}
