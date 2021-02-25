import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.page.html',
  styleUrls: ['./userlist.page.scss'],
})
export class UserlistPage implements OnInit {

  @ViewChild( IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;
  characters = [];
  nextPage = '';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
  this.http.get<any>('https://rickandmortyapi.com/api/character')
    .subscribe(res => {
      console.log(res);
      this.characters = res.results;
      this.nextPage = res.info.next;
    });
  }

  loadData(e){

    setTimeout(() => {

      if ( this.characters.length === 671 ){
        e.target.complete();
        this.infiniteScroll.disabled = true;
        return;
      }

      this.http.get<any>(this.nextPage)
      .subscribe(res => {
        this.characters.push(...res.results);
        this.nextPage = res.info.next;
      });
      e.target.complete();

    }, 300);
  }

}
