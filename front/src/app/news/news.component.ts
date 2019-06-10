import { Component, EventEmitter,OnInit, Output } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { IStock } from '../shared/models/models';
import { StocksComponent } from '../stocks/stocks.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  public stocks:IStock[]=[];

  constructor(private provider:ProviderService) { }

  ngOnInit() {
    this.provider.getStocks().then(res => {
      this.stocks = res;
  });
  }
  

}
