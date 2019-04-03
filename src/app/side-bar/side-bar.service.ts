import { Injectable } from '@angular/core';
import { DataWrapperService } from '../shared/data-wrapper.service';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {

    constructor(private dataWrapper: DataWrapperService) { }

    getPosts() {
        return this.dataWrapper.getData('assets/data.json');
    }

}
