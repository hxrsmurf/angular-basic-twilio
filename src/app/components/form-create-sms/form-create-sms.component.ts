import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-create-sms',
  templateUrl: './form-create-sms.component.html',
  styleUrls: ['./form-create-sms.component.css']
})
export class FormCreateSmsComponent implements OnInit {

  envAPIKey = environment
  stringify = ''
  textResult = ''

  formAPISetup = this.fb.group({
    apiURL: [this.envAPIKey.apiURL],
    apiUser: [this.envAPIKey.apiUser],
    apiKey: [this.envAPIKey.apiKey],
    receipient: [''],
    body: ['Angular Meow']
  })

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
  }

  apiURL = this.formAPISetup.value.apiURL
  body = this.formAPISetup.value.body

  onSubmit(){
    //console.log(this.formAPISetup.value.apiURL)
    const base64API = btoa(this.formAPISetup.value.apiUser + ':' + this.formAPISetup.value.apiKey)
    const headers = { 'Content-Type': 'application/json', 'Authorization': 'Basic ' +  base64API }    
    let getResult = this.http.get(this.apiURL, {headers}).subscribe((res:any) => {
      this.stringify = res
    })
  }

  sendText(){
    const base64API = btoa(this.formAPISetup.value.apiUser + ':' + this.formAPISetup.value.apiKey)
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ' +  base64API }
    console.log(base64API)

    let newBody = new URLSearchParams({
      // E.164 format
      'From' : '',
      'To' :'',
      'Body': this.body
    })

    let postResult = this.http.post(this.apiURL, newBody, { headers }).subscribe((res:any) => {
      this.textResult = res
    })
  }
}