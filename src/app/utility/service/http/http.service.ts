import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { RequestOptions } from '@angular/http';
import { Jsonp } from '@angular/http';

@Injectable()
export class HttpService {
    isDev = true;
    constructor(private http: Http, private jsonp: Jsonp) {

    }

    sendRequest(url: string): Observable<any[]> {
        if (this.isDev) {
            return this.jsonp
                .get(url)
                .map(res => res.json())
        }
        else {
            return this.http.
                get(url).
                map((res: Response) => {
                    console.log(res);
                    return res.json();
                }
                )
        }
    }

    sendPostRequest(url: string, data: string): Observable<any[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        console.log("url is " + url);
        console.log("data is " + data);
        if (this.isDev) {
            return this.jsonp
                .get(url + "&" + data)
                .map(res => res.json())
        }
        else {
            return this.http.post(url, data, options)
                .map((res: Response) => {
                    return res.json();
                })
        }
    }


}

