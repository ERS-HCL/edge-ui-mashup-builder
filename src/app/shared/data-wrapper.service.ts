import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';


/**
 * common data wrapper service for all get and post methods
 */

@Injectable()
export class DataWrapperService {
    constructor(private http: HttpClient) { }
    getData(requestURL) {

        return this.http.get(requestURL);

    }
    pushData(requestURL, data) {


    }
}
