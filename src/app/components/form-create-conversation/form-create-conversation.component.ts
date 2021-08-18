import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-form-create-conversation',
  templateUrl: './form-create-conversation.component.html',
  styleUrls: ['./form-create-conversation.component.css']
})
export class FormCreateConversationComponent implements OnInit {

  envAPIKey = environment

  formAPISetup = new FormGroup({
    apiUser: new FormControl(this.envAPIKey.apiUser),
    apiKey: new FormControl(this.envAPIKey.apiKey)
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.warn(this.formAPISetup.value);
  }

}
