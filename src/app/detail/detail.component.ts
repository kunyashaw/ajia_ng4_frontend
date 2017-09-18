import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { HttpService } from '../utility/service/http/http.service'

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
    constructor(private activatedRoute: ActivatedRoute, private httpService: HttpService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((result: any) => {
            console.log(result);
            this.id = result.id;
            this.loadData();
        })
    }

    loadData() {
        this.httpService.sendRequest('/product/details.php?&callback=JSONP_CALLBACK&lid=' + this.id)
            .subscribe((result: any) => {
                this.isDataReady = true;
                console.log(result);
                this.details = result.details;
                this.family = result.family;
                console.log(this.details.picList);
            })
        /**
         * $('body > .loading').hide();
            console.log(result);
            var details = result.details;
            var family = result.family;
            $('#fname').html(family.fname);

            $('#mImg').attr('src', details.picList[0].md);
            //缩略图
            var html = '';
            $.each(details.picList, function (i, pic) {
                if (i < 5) {
                    html += `<li class="i1"><img src="${pic.sm}" data-md="${pic.md}" data-lg="${pic.lg}"></li>`;
                }
            })
            $('#icon_list').html(html);
            $('.right_detail .title').html(details.title);
            $('.right_detail .subtitle').html(details.subtitle);
            $('#pro_price span').html('￥' + details.price);
            $('.price .promise').html('<b>服务承诺：</b>' + details.promise);
            //规格
            var html = '<s>规格：</s><div>';
            $.each(family.laptopList, function (i, laptop) {
                html += `<a href="product_details.html?lid=${laptop.lid}" class="avenge ${laptop.lid === details.lid ? 'borderChange' : ''}">${laptop.spec}</a>`;
            });
            html += '</div>';
            $('.spec').html(html);
            //详细参数
            var html = `
  <li><a href="#">商品名称：${details.lname}</a></li>
  <li><a href="#">系统：${details.os}</a></li>
  <li><a href="#">内存容量：${details.memory}</a></li>
  <li><a href="#">分辨率：${details.resolution}</a></li>
  <li><a href="#">显卡型号：${details.video_card}</a></li>
  <li><a href="#">处理器：${details.cpu}</a></li>
  <li><a href="#">显存容量：${details.video_memory}</a></li>
  <li><a href="#">分类：${details.category}</a></li>
  <li><a href="#">硬盘容量:${details.disk}</a></li>
`;
            $('#parm ul').html(html);
            //详细介绍
            $('#product_introduction').append(details.details);

            //显示产品细节主体
            $('.product_details').show();
        }
         *
         *
         */
    }
}