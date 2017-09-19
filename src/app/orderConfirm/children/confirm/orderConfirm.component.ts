import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../utility/service/http/http.service'

@Component({
    selector: 'storeOrderConfirm',
    templateUrl: './orderConfirm.component.html',
    styleUrls: ['./order_confirm.css']
})

export class OrderConfirmComponent implements OnInit {
    cartList: any = [];
    totalPrice = 0;
    constructor(private httpService: HttpService) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        //更新服务器端该菜品的选中情况
        this.httpService.sendRequest('/cart/list_checked.php?&callback=JSONP_CALLBACK')
            .subscribe((result: any) => {
                console.log(result);
                if (result.code == 200) {
                    this.cartList = result.data;
                    for (var i = 0; i < this.cartList.length; i++) {
                        this.totalPrice += (this.cartList[i].count * this.cartList[i].price);
                    }
                }
            })
    }
}