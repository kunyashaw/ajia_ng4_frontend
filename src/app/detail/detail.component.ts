import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'storeDetail',
    templateUrl: './detail.component.html',
    styleUrls: ['./animate.css', './product_details.css']
})

export class DetailComponent implements OnInit {
    id: any = "";
    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((result: any) => {
            console.log(result);
            this.id = result.id;
        })
    }
}