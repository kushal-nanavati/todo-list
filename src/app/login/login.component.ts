import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute){}
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]]
  });

  public onSubmit(): void {
    this.router.navigate(['todo-list'], { relativeTo: this.activatedRoute })
    
  }
}
