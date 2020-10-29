import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router
        ) {
        
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: [''],
            lastName: [''],
            email: ['', Validators.required],
            mobileNo: ['', Validators.required],
            gender: [''],
            address: [''],
            password: ['', [Validators.required, Validators.minLength(8)]],
            conPassword: ['', [Validators.required]]
        },{validator: this.passwordMatchValidator});
    }

    passwordMatchValidator(frm: FormGroup) {
      return frm.controls['password'].value === frm.controls['conPassword'].value ? null : {'mismatch': true};
    }
        onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }
        else{
          alert('Registered Successfully');
          this.router.navigate(['/login']);
        }
      }
    }
