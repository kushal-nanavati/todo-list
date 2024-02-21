import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ModalPopupComponent } from './shared/components/modal-popup/modal-popup.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './shared/services/task.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RegisterComponent } from './register/register.component';
import { FormsComponent } from './shared/components/forms/forms.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { InputComponent } from './shared/components/input/input.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { UsersService } from './shared/services/users.service';
import { authGuard } from './shared/constants/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModalPopupComponent,
    TodoListComponent,    
    RegisterComponent, FormsComponent, HeaderComponent, InputComponent, ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:5000,
      positionClass:'toast-top-right',
      preventDuplicates:true
    })
  ],
  providers: [TaskService, ToastrService, UsersService],
  exports: [ModalPopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
