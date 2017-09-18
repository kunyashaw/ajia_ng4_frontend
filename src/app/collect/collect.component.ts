import { Component, OnInit } from '@angular/core';
import { HttpService } from '../utility/service/http/http.service';
@Component({
    selector: 'storeCollect',
    templateUrl: './collect.component.html',
    styleUrls: ['./my_collect.css']
})

export class CollectComponent implements OnInit {
    constructor(private httpService: HttpService) { }

    ngOnInit() { }

    loadData() {
        // this.httpService.sendPostRequest
    }
}