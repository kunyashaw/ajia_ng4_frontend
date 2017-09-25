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

    // 修改购物车中产品的数量
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
                        //只有在本产品选中时，修改产品数量时 才有必要修改选中的总价格信息
                        if (this.productList[index].isSelected) {
                            if (isAdd) {
                                this.nowTotalSelectPrice += (this.productList[index].count * this.productList[index].price);
                            }
                            else {
                                this.nowTotalSelectPrice -= (this.productList[index].count * this.productList[index].price);
                            }
                        }

                    }
                })
        }
    }

    // 全选 或者 取消全选
    selectAll() {
        this.isSelectAll = !this.isSelectAll;
        for (var i = 0; i < this.productList.length; i++) {
            this.productList[i].isSelected = this.isSelectAll;
        }
        if (this.isSelectAll) {
            this.nowTotalSelectCount = this.productList.length
            this.nowTotalSelectPrice = 0;
            for (var i = 0; i < this.productList.length; i++) {
                this.nowTotalSelectPrice += (this.productList[i].count * this.productList[i].price);
            }
        } else {
            this.nowTotalSelectCount = 0;
            this.nowTotalSelectPrice = 0;
        }
    }

    // 选中或者取消选中 购物车中某一个
    selectSpecifyOne(index: number) {
        this.productList[index].isSelected = !this.productList[index].isSelected;
        var checked = 0;
        if (this.productList[index].isSelected) {
            checked = 1;
            this.nowTotalSelectCount++;
            this.nowTotalSelectPrice += (this.productList[index].count * this.productList[index].price);
        }
        else {
            checked = 0;
            this.nowTotalSelectCount--;
            this.nowTotalSelectPrice -= (this.productList[index].count * this.productList[index].price);
            //如果取消选中了某一个时当时处于全选状态，则取消全选。
            if (this.isSelectAll) {
                this.isSelectAll = false;
            }
        }

        //更新服务器端该菜品的选中情况
        this.httpService.sendRequest('/cart/update_checked.php?&callback=JSONP_CALLBACK&iid=' + this.productList[index].iid + "&checked=" + checked)
            .subscribe((result: any) => {
                console.log(result);
            })
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
        this.router.navigateByUrl('/orderContainer');
        // var selectList = [];
        // for (var i = 0; i < this.productList.length; i++) {
        //     if (this.productList[i].isSelected) {
        //         selectList.push(this.productList[i]);
        //     }
        // }
        // console.log(selectList);
        // this.router.navigate(['/orderConfirm', { 'list': selectList }]);
    }
}