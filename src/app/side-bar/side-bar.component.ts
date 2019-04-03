import { Component, OnInit } from '@angular/core';
import { SidebarService } from './side-bar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  public data: any = {};
  public list: Array<any> = [];
  public keys: Array<any> = [];
  constructor(private _appService: SidebarService) {

  }

  ngOnInit() {
    this._appService.getPosts().subscribe((response: any) => {
      this.data = response;
      for (let i in response) {
        this.keys.push(i);
      }

    });


  }

 
}
