import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmedValidator} from "./confirmed.validator";
import {IUser} from "../iuser";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister = new FormGroup({});

  users: IUser[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      country: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.min(18)]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^\\+84\\d{9,10}$')]]
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')});
  }

  submitForm() {
    let data = this.formRegister?.value;
    this.users.push(data);
    this.formRegister?.reset();
  }

  get email() {
    return this.formRegister.get('email');
  }

}
