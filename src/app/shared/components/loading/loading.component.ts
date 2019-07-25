import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from './loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  private timer: any;
  private dotsArray: string[] = [];
  private dots = '';
  private limit = 4;
  private speed = 150;
  private subscription: Subscription;
  public isShow = false;

  constructor(
    private loading: LoadingService
  ) { }

  ngOnInit() {
    this.subscription = this.loading.watch().subscribe( x => {
      switch (x) {
        case 'LOADING_START':
          this.show();
          break;
        case 'LOADING_END':
            this.hide();
            break;
        default:
          break;
      }
    });
  }

  hide() {
    this.isShow = false;
    clearInterval(this.timer);
  }

  show() {
    this.isShow = true;
    this.timer = setInterval( () => {
      this.dotsArray.push('.');
      if (this.dots.length >= this.limit) {
        this.dotsArray = [];
      } 
      this.dots = this.dotsArray.join('');
    }, this.speed);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
    this.subscription.unsubscribe();
  }
}
