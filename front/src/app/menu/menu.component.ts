
import { Component, OnInit,Input} from '@angular/core';
import { ICategory,IMeal } from '../shared/models/models';
import { ProviderService } from '../shared/services/provider.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public categories:ICategory[]=[];
  public meals:IMeal[]=[];
  public current:ICategory;
  public showCat=true;
  
  
  constructor(private provider:ProviderService) {

   }

  ngOnInit() {
    this.provider.getCategories().then(res => {
      this.categories = res;
  });
}
getMeals(category){
  this.provider.getMeals(category).then(res=>{
    this.meals=res;
    this.showCat=false;
    this.current=category;
  });
}
back(){
  this.showCat=true;
  this.meals=[];
  
  this.provider.getCategories().then(res => {
    this.categories = res;
});
}


}
