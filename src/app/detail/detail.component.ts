import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { HttpService } from '../utility/service/http/http.service'
import { Router } from '@angular/router'

@Component({
    selector: 'storeDetail',
    templateUrl: './detail.component.html',
    styleUrls: ['./animate.css', './product_details.css']
})

export class DetailComponent implements OnInit {

    id: any = "";
    isDataReady = false;
    details = {};
    family = {};
    nowSelectIndex = 0;//选中缩略图，显示大图
    nowMouseSpec = 0;//当前的规格
    isSpecSelected = 0;
    isEnter = false;//鼠标放在光标时改变颜色
    isLogin = false;//是否登录

    nowCount = 1;
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private httpService: HttpService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((result: any) => {
            console.log(result);
            this.id = result.id;
            this.loadData();
        })
    }
    // 选中详情页中的小图片时，同步修改大图片
    changeIndex(nowSelectIndex: number) {
        this.nowSelectIndex = nowSelectIndex;
    }

    //选中某款规格，改变class boardChagne
    selectSpec(index: number) {
        this.isSpecSelected = index;
    }
    mouseGo(enter: true, index: number) {
        console.log(enter ? '进入' : '离开');
        this.isEnter = enter;
        this.nowMouseSpec = index;
    }
    //定义方法，用来实现数量加减
    modifyCount(isAdd: boolean) {
        if (isAdd) {
            this.nowCount++;
        }
        else {
            if (this.nowCount > 1) {
                this.nowCount--;
            }
        }
    }

    wetherLogin(data: boolean) {
        this.isLogin = data;
    }

    loadData() {
        this.httpService.sendRequest('/product/details.php?&callback=JSONP_CALLBACK&lid=' + this.id)
            .subscribe((result: any) => {
                this.isDataReady = true;
                console.log(result);
                this.details = result.details;
                this.family = result.family;
                //console.log(this.details.picList);
            })
    }
    //添加到购物车，当用户登录且添加成功时，跳转到购物车页面，否则退出到登录页面
    addToCart() {
        if (this.isLogin) {
            this.httpService.sendRequest('/cart/add.php?&callback=JSONP_CALLBACK&lid=' + this.id + "&buyCount=" + this.nowCount)
                .subscribe((result: any) => {
                    console.log(result);
                    if (result.code === 200) {
                        this.jump('/cart')
                    }
                })
        }
        else {
            this.jump('/login')
        }
    }

    jump(url: string) {
        this.router.navigateByUrl(url);
    }
}