import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { HeadersService } from 'src/app/services/headers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  envAPIKey = environment
  textGetMessages: any
  text = new FormControl('');
  textForm = this.fb.group({
    text: ['']
  })

  @ViewChild('scrollme')
  private myScrollContainer!: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  constructor(
    private getHeaders: HeadersService,
    private http: HttpClient,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.pageLoad()
  }

  pageLoad() {
    this.getMessages()
    this.scrollToBottom()
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
  
  getMessages(){
    const headers = this.getHeaders.setHeaders().headers
    //const messagesURL = this.envAPIKey.conversationAPIURL + this.formAPISetup.value.textConversationSID + '/Messages'
    const messagesURL = this.envAPIKey.conversationAPIURL + '' + '/Messages'

    this.http.get(messagesURL, { headers }).subscribe((res:any) => {
      this.textGetMessages = res.messages
    })    
  }

  sendChat(){
    if (this.textForm.value.text) {      
      const headers = this.getHeaders.setHeaders().headers
      this.text.setValue('')
      
      //const conversationURL = this.envAPIKey.conversationAPIURL + this.formAPISetup.value.textConversationSID + '/Messages'
      const conversationURL = this.envAPIKey.conversationAPIURL + '' + '/Messages'

      let body = new URLSearchParams({
        'Author' : 'Twilio',
        'Body' : this.textForm.value.text
      })
      this.http.post(conversationURL, body, { headers }).subscribe((res:any) => {
        this.pageLoad()
      })

    } else { return }
  }

}
