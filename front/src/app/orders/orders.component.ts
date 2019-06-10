import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { IOrder, IMeal, IUser } from '../shared/models/models';
import { localeData } from 'moment';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { isFormattedError } from '@angular/compiler';
import { userInfo } from 'os';
import { range } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders:IOrder[]=[];
  public Making=false;
  public user:IUser;
  public meals:IMeal[]=[];
  public currentOrder:IOrder;
  public total_price:number=0;
  public meals_list='';
  public users:IUser[]=[];
  
  // public bill:IMeal[]=[];
  constructor(private provider:ProviderService) { }

  ngOnInit() {
    this.provider.getOrders().then(res=>{
      this.orders=res;
    }); 
    this.provider.getAllMeals().then(r=>{
      this.meals=r;
    });
  }
  making(){
    
    this.provider.getAllMeals().then(r=>{
      this.meals=r;
    });
    let el=document.getElementById("make");
    if (this.Making){
      this.meals_list='';
      this.total_price=0;
      
      this.Making=false;
      el.innerHTML="MAKE ORDER";
      var i=document.createElement("img");
      i.src="../../assets/order.png";
      i.width=50;
      i.style.setProperty("padding-left","30px");
      el.appendChild(i);
      for(let m of this.meals){
        m.count=0;
      }
    }else{
      this.Making=true;
      el.innerHTML="QUIT";
    }
  }
  complete(){
    for( let l of this.meals){
      if(l.count!==0){
        this.meals_list+=(l.name+'-'+l.price+'-'+l.count+"!");
        this.total_price=this.total_price+l.count*l.price;
      }
    }
    if(this.total_price===0){
      alert("You haven't chosen any meals");
      return;
    }
        this.provider.getUsers().then(my_users=>{
          
          this.users=my_users;
          for(let u of this.users){
            if(u.username===localStorage.getItem('username')){
              this.user=u;
              console.log(this.total_price);
              this.provider.createOrder(this.meals_list,this.user,this.total_price).then(ord=>{
                console.log(ord);
                console.log(this.user.email);
                console.log(ord.meals);
                var meal:string[]=ord.meals.split('!');
                var mes="Hello! It is IFOOD!\nYour order has been sent correctly!\nYour order:\n"
                let i=0;
                while(i<meal.length-1){
                  var name=meal[i];
                  i+=1;
                  mes+=i+". "+name+"\n";
                  
                }
                mes+="Total price: "+ord.total_price+"\n";
                mes+="\n\nTotal price was counted without your card discount, if you have it,price will be recounted later."+
                "\nThank you for choosing our restaurant!\nEnjoy your meal!";
                
                this.provider.sendMessage(mes,this.user.email).then(ms =>{
                  // console.log(ms);
                  // console.log(nM);
                  alert("Order description has been send to your e-mail :)");
                  
                });
              }
              );
              console.log(this.user);
              console.log(this.meals_list)
              alert("Thank you, "+this.user.username+"!\nYour order has been sent.\nEnjoy your meal!");
              this.making();
              return;
            }
          }
        });
        
        // console.log(this.users);
        
        // console.log(this.currentOrder);
       
    
  }
 

}
