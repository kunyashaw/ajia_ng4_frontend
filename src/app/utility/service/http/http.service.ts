import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {
    constructor(private http: Http) {
        //this.http.get('https://jsonplaceholder.typicode.com/posts')
    }

    sendRequest(url: string): Observable<any[]> {
        return this.http.
            get(url).
            map((res: Response) => {
                console.log(res);
                return res.json();
            }
            )
    }


}

