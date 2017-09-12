import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'notFound',
    template: '<h1>404</h1> <a routerLink="/index">回首页</a>'
})

export class NotFoundComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}