import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { ChatComponent } from './components/chat/chat.component';
import { FormCreateConversationComponent } from './components/form-create-conversation/form-create-conversation.component';
import { FormCreateSmsComponent } from './components/form-create-sms/form-create-sms.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  { path: 'conversations', component: ChatComponent },
  { path: 'sms', component: FormCreateSmsComponent },
  { path: 'debug', component: FormCreateConversationComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }