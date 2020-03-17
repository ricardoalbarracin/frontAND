import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '@shared/loading/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  loading: boolean;
  loadingSubscription: Subscription;

  constructor(private loadingService: LoadingService) {
    this.loading = false;
  }

  ngOnInit() {}

  ngAfterViewInit() {     
    this.loadingService.receivedFilter.subscribe((param: boolean) => {
      this.loading = param;
    });       
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
