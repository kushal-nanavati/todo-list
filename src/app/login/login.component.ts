import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import { AccessToken, LoggedInUsers } from '../shared/models/users.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private router: Router, private toastrService: ToastrService, private userService: UsersService){}
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]]
  });

  public onSubmit(formData: object): void {
    this.userService.validateUser((formData as LoggedInUsers)).subscribe((accessToken: AccessToken) => {
      if(accessToken.token) {
        this.router.navigate(['/todo-list']);   
      } else {
        this.toastrService.error('Invalid credentials, sign up to create an account');
      }
    });    
  }
}
