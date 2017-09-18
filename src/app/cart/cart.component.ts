import { Component, OnInit } from '@angular/core';
import { HttpService } from '../utility/service/http/http.service'
import { Router } from '@angular/router'
@Component({
    selector: 'storeCart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.css']
})

export class CartComponent implements OnInit {
    productList: any = [];
    isDataReady = false;
    isSelectAll = false;
    nowTotalSelectCount = 0;
    nowTotalSelectPrice = 0;
    constructor(private router: Router, private httpService: HttpService) { }

    ngOnInit() {
        this.loadData();
    }

    modifyCount(index: number, isAdd: boolean) {
        let saveCount = this.productList[index].count;
        let nowCount = this.productList[index].count;
        if (isAdd) {
            nowCount++;
        }
        else {
            if (this.productList[index].count > 1) {
                nowCount--;
            }
        }
        if (nowCount != saveCount) {
            this.httpService.sendRequest('/cart/update_count.php?&callback=JSONP_CALLBACK&iid=' + this.productList[index].lid + "&count=" + nowCount)
                .subscribe((result: any) => {
                    console.log(result);
                    if (result.code == 200) {
                        console.log('修改本地数量');
                        this.productList[index].count = nowCount;
                        if (isAdd) {
                            this.nowTotalSelectPrice += (this.productList[index].count * this.productList[index].price);
                        }
                        else {
                            this.nowTotalSelectPrice -= (this.productList[index].count * this.productList[index].price);
                        }
                    }
                })
        }
    }

    selectAll() {
        this.isSelectAll = !this.isSelectAll;
        for (var i = 0; i < this.productList.length; i++) {
            this.productList[i].isSelected = this.isSelectAll;
        }
        if (this.isSelectAll) {
            this.nowTotalSelectCount = this.productList.length
            for (var i = 0; i < this.productList.length; i++) {
                this.nowTotalSelectPrice += (this.productList[i].count * this.productList[i].price);
            }
        } else {
            this.nowTotalSelectCount = 0;
            this.nowTotalSelectPrice = 0;
        }
    }

    selectSpecifyOne(index: number) {
        this.productList[index].isSelected = !this.productList[index].isSelected;
        if (this.productList[index].isSelected) {
            this.nowTotalSelectCount++;
            this.nowTotalSelectPrice += (this.productList[index].count * this.productList[index].price);
        }
        else {
            this.nowTotalSelectCount--;
            this.nowTotalSelectPrice -= (this.productList[index].count * this.productList[index].price);
        }
    }

    loadData() {
        this.httpService.sendRequest('/cart/list.php?&callback=JSONP_CALLBACK')
            .subscribe((result: any) => {
                console.log(result);
                this.productList = result.data;
                this.isDataReady = true;
                console.log(this.isDataReady ? '数据准备就绪' : '数据还没有搞定');
                for (var i = 0; i < this.productList.length; i++) {
                    this.productList[i].isSelected = false;
                }
                console.log(this.productList);
            })
    }

    toPay() {
        this.router.navigateByUrl('/orderConfirm');
    }
}