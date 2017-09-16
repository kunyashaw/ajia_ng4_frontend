import { Component, OnInit } from '@angular/core';
//要想让ngSubmit事件生效，必须加上这个。
import { NgForm } from '@angular/forms'
import { HttpService } from '../utility/service/http/http.service';
import { Router } from '@angular/router'

@Component({
    selector: 'storeRegister',
    templateUrl: './register.component.html',
    styleUrls: ['./login.css']
})

export class RegisterComponent implements OnInit {
    //userName = "";
    constructor(private httpService: HttpService, private router: Router) { }

    ngOnInit() { }

    handleSubmit(data: any) {

        this.httpService.sendPostRequest(
            '/user/register.php/?&callback=JSONP_CALLBACK',
            "uname=" + data.uname + "&upwd=" + data.upwd + "&phone=" + data.phone + "&email=" + data.email
        )
            .subscribe((result: any) => {
                console.log(result);
                //var pageToJump = result.pageToJump ? result.pageToJump : 'index';
                if (result.code = '200') {
                    this.router.navigateByUrl('/login')
                }
                else {
                    alert('注册失败')
                }
            })
    }
}