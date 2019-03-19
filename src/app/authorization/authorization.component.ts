import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthorizationService} from "../authorization.service";

@Component({
    selector: 'app-authorization',
    templateUrl: './authorization.component.html',
    styleUrls: ['./authorization.component.sass']
})
export class AuthorizationComponent implements OnInit {
    authForm: FormGroup;
    isEmailValid: boolean = true;
    isPasswordValid: boolean = true;
    authSuccess: boolean = false;
    token;

    constructor(private authFormBuilder: FormBuilder, private loginService: AuthorizationService) {
    }

    private initForm(): void {
        this.authForm = this.authFormBuilder.group({
            email: [null, [
                Validators.required,
                Validators.pattern(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/),
            ]],
            password: [null, [
                Validators.required,
                Validators.minLength(2)
            ]],
        })
    }

    onSubmit() {
        (this.authForm.controls.email.valid) ? this.isEmailValid = true : this.isEmailValid = false;
        (this.authForm.controls.password.valid) ? this.isPasswordValid = true : this.isPasswordValid = false;

        this.loginService.postLogin(this.authForm.value.email, this.authForm.value.password).subscribe(
            (data) => {
                this.token = data['token'];
                localStorage.setItem('token', this.token);
                this.authSuccess = true;
            },
            (error) => {
                this.isEmailValid = false;
                this.isPasswordValid = false;
            }
        );
    }

    ngOnInit() {
        this.initForm();
        (localStorage.getItem('token')) ? this.authSuccess=true : this.authSuccess=false;
    }

}
