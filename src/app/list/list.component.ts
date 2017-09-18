import { Component, OnInit } from '@angular/core';
import { HttpService } from '../utility/service/http/http.service';

@Component({
    selector: 'storeList',
    templateUrl: './list.component.html',
    styleUrls: ['./products.css']
})

export class ListComponent implements OnInit {
    productList: any[] = [];
    constructor(private httpService: HttpService) { }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        //'/user/logout.php?&callback=JSONP_CALLBACK'
        this.httpService.sendRequest('/product/list.php?&callback=JSONP_CALLBACK')
            .subscribe((result: any) => {
                console.log(result);

                this.productList = result.data;
            })
    }
}