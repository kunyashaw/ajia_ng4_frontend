import { Component, OnInit } from '@angular/core';
import { HttpService } from '../utility/service/http/http.service';
import { Router } from '@angular/router'
@Component({
    selector: 'storeLogin',
    templateUrl: './login.component.html',
    styleUrls: ['./login.css']
})

export class LoginComponent implements OnInit {
    constructor(private httpService: HttpService, private router: Router) { }
    uname = "";
    upwd = "";
    uAutoLogin = false;

    ngOnInit() { }



    //定义表单提交时要执行的方法
    handleSubmit() {

        this.httpService.sendPostRequest(
            'http://localhost/ajia/data_callback/user/login.php/?&callback=JSONP_CALLBACK',
            'uname=' + this.uname + "&upwd=" + this.upwd
        )
            .subscribe((result: any) => {
                console.log(result);
                //var pageToJump = result.pageToJump ? result.pageToJump : 'index';
                if (result.code = '200') {
                    this.router.navigateByUrl('/index')
                }
            })
    }
}