import { Component, OnInit } from '@angular/core';
import { HttpService } from '../utility/service/http/http.service';
import { Jsonp } from '@angular/http';

@Component({
    selector: 'storeStart',
    templateUrl: './index.component.html',
    styleUrls: ['./animate.css', './base.css', './item_cat.css', './item_food.css', './slide.css']
})

export class IndexComponent implements OnInit {
    carouselItems: any[] = [];
    recommendedItems: any[] = [];
    //The time to show the next photo
    private NextPhotoInterval: number = 1000;
    //Looping or not
    private noLoopSlides: boolean = false;
    //Photos
    private slides: Array<any> = [];

    constructor(private myHttp: HttpService, private jsonp: Jsonp) {

    }


    ngOnInit() {

        //发起请求
        this.loadData();
        //设置轮播
    }

    private removeLastSlide() {
        this.slides.pop();
    }
    //定义方法，用来获取首页数据
    loadData() {
        this.myHttp.sendRequest('/product/?callback=JSONP_CALLBACK')
            .subscribe((response: any) => {
                console.log(response);
                this.carouselItems = response.carouselItems;
                this.recommendedItems = response.recommendedItems
                //初始化数据
                for (var i = 0; i < this.carouselItems.length; i++) {
                    this.slides.push(
                        { image: this.carouselItems[i].img, text: this.carouselItems[i].title }
                    );
                }
                //首页推荐


            }, (error) => {
                console.error(error);
            });
    }

}