import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from './login.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private loading: LoadingService
  ) {

    this.form = fb.group({
      username: [null, Validators.required ],
      password: [ null, Validators.required]
    });

  }

  ngOnInit() {
  }

  submitLogin() {
    if (this.form.invalid) {return; }
    this.loginService.authenticationUser({
      username: this.form.value.username,
      password: this.form.value.password
    }).subscribe( x => {
      console.log(x);
    });
  }
}
