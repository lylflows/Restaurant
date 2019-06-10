import { Component, OnInit } from '@angular/core';
import { IStock } from '../shared/models/models';
import { ProviderService } from '../shared/services/provider.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  public stocks:IStock[]=[];
  public current:IStock;
  public oneStock=true;
  
  constructor(private provider:ProviderService) {

   }

  ngOnInit() {
    this.oneStock=false;
    this.provider.getStocks().then(res => {
      this.stocks = res;
  });
}
getStock(stock:IStock){
  this.provider.getOneStock(stock).then(res=>{
    this.current=res;
    this.oneStock=true;
  })
}

back(){
  this.oneStock=false;
  this.provider.getStocks().then(res => {
    this.stocks = res;
});
}
}
