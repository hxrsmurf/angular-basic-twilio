import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormCreateConversationComponent } from './components/form-create-conversation/form-create-conversation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormCreateSmsComponent } from './components/form-create-sms/form-create-sms.component';
import { HeadersService } from './services/headers.service';
import { ChatComponent } from './components/chat/chat.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormCreateConversationComponent,
    FormCreateSmsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HeadersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
