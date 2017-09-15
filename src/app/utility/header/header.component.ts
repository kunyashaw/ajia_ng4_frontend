import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http/http.service';
@Component({
    selector: 'storeHeader',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
    constructor(private httpService: HttpService) { }
    userLogined = false;
    userName = "获取名字中...";
    ngOnInit() {
        this.checkLogin()
    }

    logout() {
        this.httpService.sendRequest('http://localhost/ajia/data_callback/user/logout.php?&callback=JSONP_CALLBACK')
            .subscribe((result: any) => {
                if (result.code == 200) {
                    alert('<h4>退出成功</h4>点击确定重新返回登录页面');
                }
                else {
                    alert('登录退出失败！原因：' + result.msg);
                }
            })
    }

    checkLogin() {
        this.httpService.sendRequest('http://localhost/ajia/data_callback/user/session_data.php?&callback=JSONP_CALLBACK')
            .subscribe((result: any) => {
                console.log(result)
                if (result.uname) {
                    this.userName = result.uname;
                    this.userLogined = true;
                }

            })
    }
}