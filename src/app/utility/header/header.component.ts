import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http/http.service';
import { Router } from '@angular/router'
@Component({
    selector: 'storeHeader',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
    constructor(private httpService: HttpService, private router: Router) { }
    userLogined = false;
    userName = "获取名字中...";
    ngOnInit() {
        this.checkLogin()
    }

    logout() {
        this.httpService.sendRequest('/user/logout.php?&callback=JSONP_CALLBACK')
            .subscribe((result: any) => {
                if (result.code == 200) {
                    var r = confirm('退出成功');
                    console.log(r);
                    if (r) {
                        this.userLogined = false;
                    }
                }
                else {
                    alert('登录退出失败！原因：' + result.msg);
                }
            })
    }

    checkLogin() {
        this.httpService.sendRequest('/user/session_data.php?&callback=JSONP_CALLBACK')
            .subscribe((result: any) => {
                console.log(result)
                if (result.uname) {
                    this.userName = result.uname;
                    this.userLogined = true;
                }

            })
    }
}