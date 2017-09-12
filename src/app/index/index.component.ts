import { Component, OnInit } from '@angular/core';
import { HttpService } from '../utility/service/http/http.service';

@Component({
    selector: 'storeStart',
    templateUrl: './index.component.html',
    styleUrls: ['./animate.css', './item_food.css', './slide.css']
})

export class IndexComponent implements OnInit {
    constructor(private myHttp: HttpService) { }

    ngOnInit() {
        //发起请求
        this.loadData();
    }

    //定义方法，用来获取首页数据
    loadData() {
        // this.myHttp
        //     .sendRequest('http://localhost/ajia/data_callback/product/?call_back')
        //     .subscribe((list: any) => {
        //         console.log(list);
        //     })

        this.myHttp
            .sendRequest('http://localhost/ajia/data_callback/product/&c=JSONP_CALLBACK')
            .subscribe((list: any) => {
                console.log(list);
            })

    }

}