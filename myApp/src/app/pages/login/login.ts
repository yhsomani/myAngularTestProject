import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  logObj: any = {
    "EmilId": "",
    "Password": ""
  }

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    this.http.post("https://freeapi.miniprojectideas.com/api/User/Login", this.logObj).subscribe((res: any) => {
      if (res.result) {
        alert("Login Success");
        localStorage.setItem('angular18Token', res.data.token);
        this.router.navigateByUrl('dashboard')
      } else {
        alert(res.message)
      }
    })
  }
}
