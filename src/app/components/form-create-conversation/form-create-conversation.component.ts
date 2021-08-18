import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators'
import { HeadersService } from 'src/app/services/headers.service';

@Component({
  selector: 'app-form-create-conversation',
  templateUrl: './form-create-conversation.component.html',
  styleUrls: ['./form-create-conversation.component.css']
})
export class FormCreateConversationComponent implements OnInit {

  envAPIKey = environment
  stringify = ''
  textResult = ''
  newConversationInfo = ''
  conversationInfo = ''
  addToConversationInfo = ''
  deleteConversationInfo = ''
  addChatInfo = ''
  textGetAllConversations: any
  Object = Object;
  textGetMessages: any
  chatter = ''

  formAPISetup = this.fb.group({
    apiURL: [this.envAPIKey.apiURL],
    apiUser: [this.envAPIKey.apiUser],
    apiKey: [this.envAPIKey.apiKey],
    receipient: [this.envAPIKey.to],
    body: [''],
    conversationName: ['My Conversation'],
    textConversationSID: [''],
    chatter: ['']
  })

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private getHeaders: HeadersService
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
      'From' : this.envAPIKey.from,
      'To' : this.envAPIKey.to,
      'Body': this.body
    })

    let postResult = this.http.post(this.apiURL, newBody, { headers }).subscribe((res:any) => {
      this.textResult = res
    })
  }

  createConversation(){
    const headers = this.getHeaders.setHeaders().headers

    let body = new URLSearchParams({
      'MessagingServiceSid' : this.envAPIKey.messageServiceSID,
      'FriendlyName' : this.formAPISetup.value.conversationName

    })
    
    this.http.post(this.envAPIKey.conversationAPIURL, body, { headers } ).subscribe((res:any) => {
      this.newConversationInfo = res.sid
    })
  }

  addToConversation(){
    const headers = this.getHeaders.setHeaders().headers

    let body = new URLSearchParams({
      'MessagingBinding.Address' : '+1' + this.formAPISetup.value.receipient
    })

    const conversationURL = this.envAPIKey.conversationAPIURL + this.formAPISetup.value.textConversationSID + '/Participants'

    this.http.post(conversationURL, body, { headers }).subscribe((res:any) => {
      this.addToConversationInfo = res
    })
  }  

  addProxyGroupChat(){
    const headers = this.getHeaders.setHeaders().headers

    let body = new URLSearchParams({
      'Identity': 'Twilio',
      'MessagingBinding.ProjectedAddress' : this.envAPIKey.from    
    })

    const conversationURL = this.envAPIKey.conversationAPIURL + this.formAPISetup.value.textConversationSID + '/Participants'

    this.http.post(conversationURL, body, { headers }).subscribe((res:any) => {
      this.addToConversationInfo = res
    })
  }

  addChatParticipant(){
    const headers = this.getHeaders.setHeaders().headers

    let body = new URLSearchParams({
      'Identity': this.formAPISetup.value.chatter,
      'MessagingBinding.ProjectedAddress' : this.envAPIKey.from
    })

    const conversationURL = this.envAPIKey.conversationAPIURL + this.formAPISetup.value.textConversationSID + '/Participants'

    this.http.post(conversationURL, body, { headers }).subscribe((res:any) => {
      this.addToConversationInfo = res
    })

  }

  deleteConversation(){
    const headers = this.getHeaders.setHeaders().headers
    
    const conversationURL = this.envAPIKey.conversationAPIURL + this.formAPISetup.value.textConversationSID

    this.http.delete(conversationURL, { headers }).subscribe((res:any) => {
      this.deleteConversationInfo = res
    })
  }

  createConversationChat(){
    const headers = this.getHeaders.setHeaders().headers

    //CHf6a773d28cbf4bfb8a1189cee9b5fcd2
    const conversationURL = this.envAPIKey.conversationAPIURL + this.formAPISetup.value.textConversationSID + '/Messages'

    let body = new URLSearchParams({
      'Author' : 'Twilio',
      'Body' : this.formAPISetup.value.body
    })
    this.http.post(conversationURL, body, { headers }).subscribe((res:any) => {})    
  }

  getAllConversations(){
    const headers = this.getHeaders.setHeaders().headers

    console.log('Getting messages')

    this.http.get(this.envAPIKey.conversationAPIURL, {headers}).subscribe((res:any) => {
      this.textGetAllConversations = res.conversations
    })
  }
  
  getMessages(){
    const headers = this.getHeaders.setHeaders().headers
    console.log(this.formAPISetup.value.textConversationSID)

    const messagesURL = this.envAPIKey.conversationAPIURL + this.formAPISetup.value.textConversationSID + '/Messages'

    this.http.get(messagesURL, { headers }).subscribe((res:any) => {
      this.textGetMessages = res.messages
    })    
  }

}
