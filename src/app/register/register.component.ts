import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../shared/services/users.service';
import { RegisteredUsers } from '../shared/models/users.model';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy{
  lastUserSavedId: number = 1;
  registerForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
    contactNumber: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^[0-9]*$')]]
  });
  subscription: Subscription = new Subscription();
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private userService: UsersService, private toastrService: ToastrService){}

  public onSubmit(formData: object): void {    
    this.subscription.add(
    this.userService.postUser(
      {id: this.lastUserSavedId, ...formData} as RegisteredUsers)
      .subscribe((rowsAffected: number[]) => {
        if(rowsAffected.at(0) === 1){
          this.toastrService.success('User registered successfully...');
          this.registerForm.reset();
          this.router.navigate(['/login']);
        }
      }));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();  
  }
}
