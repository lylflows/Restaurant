import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { ProviderService } from '../shared/services/provider.service';
import { IUser, ITable, IOrder, IMeal, ICard } from '../shared/models/models';
import { range } from 'rxjs';
import { userInfo } from 'os';
import { isNull } from 'util';
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { findLast } from '@angular/compiler/src/directive_resolver';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { viewAttached } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public info=true;
  public card=false;
  public reserve=false;
  public orders=false;
  public hasCard=false;
  public styles=["https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/GfRLKaE/videoblocks-abstract-red-polygon-background_spy7wwnje_thumbnail-full01.png","https://ak2.picdn.net/shutterstock/videos/11334422/thumb/1.jpg?i10c=img.resize(height:160)","https://ak3.picdn.net/shutterstock/videos/30531493/thumb/1.jpg?i10c=img.resize(height:160)","https://images.all-free-download.com/images/graphiclarge/abstract_low_poly_background_vector_illustration_570244.jpg"];
  public chosen='';
  public ids=["info","card","res","ord"];

  public user:IUser;
  public email:string='';
  public firstname:string='';
  public lastname:string='';
  public u= localStorage.getItem('username');
  public u1:string='';
  public search='';

  public users:IUser[]=[];
  public my_orders:IOrder[]=[];
  public my_tables:ITable[]=[];
  public reserved_tables:ITable[]=[];
  public FinalOrders:string[][]=[];

  public my_card:ICard;
  // public hasCard=false;
  public wanting=false;
  
  constructor(private provider:ProviderService) {
    // this.reUrl();
  }
 
  ngOnInit() {
    this.FinalOrders=[];
    // const u = localStorage.getItem('username');
    this.provider.getUsers().then(res1=>{
      this.users=res1;
      this.users.forEach(i=>{
        if(i.username===this.u){
          this.user=i;
          this.email=i.email;
          this.u1=i.username;
          this.firstname=i.first_name;
          this.lastname=i.last_name;
        }
      });
    });
    this.provider.getTables().then(res2=>{
      this.my_tables=res2;
    });
    
  }
  blockType(e:Event){
    for(let s of this.ids){
      document.getElementById(s).style.backgroundColor="rgba(255, 255, 255, 0.288)";
    }
    // console.log(this.user);
    var el=(e.target as Element);
    // console.log(el.id);
    document.getElementById(el.id).style.backgroundColor="rgba(185, 130, 58, 0.288)";
    if(el.id==="info"){
      this.provider.getUsers().then(res1=>{
        this.users=res1;
        this.users.forEach(i=>{
          if(i.username===this.u){
            this.user=i;
          }
        });
      });
      this.info=true;
      this.card=false;
      this.orders=false;
      this.reserve=false;
      
    }
    if(el.id==="card"){
      
      this.info=false;
      this.card=true;
      this.orders=false;
      this.reserve=false;
      // console.log(this.my_card);
      this.provider.getCards().then(res4=>{
        res4.forEach(i=>{
          if(i.owner_id===this.user.id){
            this.my_card=i;
            this.hasCard=true;
            switch(i.type){
              case "BRONZE":
              this.chosen=this.styles[0];
              break;
              case "SILVER":
              this.chosen=this.styles[1];
              break;
              case "GOLD":
              this.chosen=this.styles[2];
              break;
              case "PLATINUM":
              this.chosen=this.styles[3];
              break
  
            }
            // var l=document.querySelector(".card");
            // l.setAttribute('style','background-image:url("'+this.chosen+'");');
            // console.log(l);
           
          }
        });
        
      // console.log(this.my_card);
  
      });
    }
    if(el.id==="ord"){
      // console.log(this.FinalOrders);
      this.info=false;
      this.card=false;
      this.search='';
      this.orders=true;
      this.reserve=false;
      this.FinalOrders=[];
      this.my_orders=[];
      this.provider.getOrders().then(res3=>{
        this.FinalOrders=[];
        this.my_orders=[];
        for( let el of res3){
          this.makeCssOrder(el);
          this.my_orders.push(el);
        }
      });
      
    }
    if(el.id==="res"){
      this.provider.getTables().then(res2=>{
        this.my_tables=res2;
      });
      // console.log(this.my_tables);
      this.info=false;
      this.card=false;
      this.orders=false;
      this.reserve=true;


      this.reserved_tables=[];
    for(let element of this.my_tables){
      // console.log(this.my_tables);
      // console.log(this.user.id);
      // console.log(element.reserved_by_id);
      // console.log(element.status);
      // console.log(isNull(element.reserved_by));

      if(element.status==="RESERVED"&&element.reserved_by_id===this.user.id){       // console.log(element);
        this.reserved_tables.push(element);
      }
    }
      
    }
  }
  
  makeCssOrder(o:IOrder){
    let sp=o.meals.split('!');
    let res:string[][]=[];
    let result:string[]=[];
    let i=0;
    sp.forEach(element => {
      res[i]=element.split('-');
      i+=1;
      
    });
    result.push("ORDER ID: "+o.id.toString(),"SENDER ID: "+o.sender_id.toString()+" ");

    var  index=0;
    while(index<res.length-1){
      var name=res[index][0];
      var pr=parseInt(res[index][1]);
      var count=parseInt(res[index][2]);
      var tprm=pr*count;
      index+=1;
      result.push(index+". "+name+" . . . . . "+pr+"x"+count+" . . . . . "+tprm);
      
    }

    
    this.provider.getCards().then(res4=>{
      res4.forEach(i=>{
        if(i.owner.username===localStorage.getItem('username')){
          this.my_card=i;
          this.hasCard=true;
          // console.log(i);
        }
      });
      if(this.hasCard){
        // console.log(o.total_price);
        var disc=o.total_price*(1-this.my_card.discount/100);
        // console.log(disc);
        result.push("TOTAL: "+o.total_price.toString(),"WITH DISCOUNT: "+disc, "STATUS: "+o.status,);
      }else{
        // console.log("no discount");
        result.push("TOTAL: "+o.total_price.toString(),"STATUS: "+o.status,);
    }

    });
    this.FinalOrders.push(result);
  }

  searcH(){
    this.provider.searchOrders(this.search).then(res=>{
      console.log(res);
        this.FinalOrders=[];
        this.my_orders=[];
        for( let el of res){
          this.makeCssOrder(el);
          this.my_orders.push(el);
        }
      
    });
  }




  updateUser(){
    // console.log(this.u);
    if(this.u1!==''&&this.email!==''&&this.firstname!=''&&this.lastname!=''){
      this.user.email=this.email;
      this.user.username=this.u;
      this.user.first_name=this.firstname;
      this.user.last_name=this.lastname;
      this.provider.updateUser(this.user).then(res=>{
        this.user=res;
        localStorage.setItem('username',res.username);
        // console.log(this.user);
      });
      alert("PROFILE INFORMATION:\nUsername: "+this.user.username + "\n"+ "First name: "+this.user.first_name + "\n"+"Last name: "+this.user.last_name+"\n"+"E-mail: "+this.user.email);
      // console.log(this.user);
    }
    
  }


  want(){
    if(this.wanting){
      this.wanting=false;
    }else{
      this.wanting=true;
    }
  }
  createCard(el:Event){
    var t="";
    var d=0;
    var e=(el.target as Element);
    switch(e.id){
      case "br":
      // console.log("bronse");
      t="BRONZE";
      d=5;
      this.chosen=this.styles[0];
      break
      case "sl":
      // console.log("silver");
      t="SILVER";
      this.chosen=this.styles[1];
      d=10;
      break
      case "g":
      t="GOLD";
      d=15;
      // console.log("gold");
      break
      case "pl":
      t="PLATINUM";
      d=20;
      // console.log("platinum");
      break
    }
    this.provider.createCard(d,this.user.id,t).then(c=>{
        this.my_card=c;
        
      });
    alert("Congratulations! You get "+t+" discount card.\nNow profile page will be reloaded.\nAll changes will be saved.");
    location.reload();
  }
  view(){
    var l=document.querySelector(".card");
    l.setAttribute('style','background-image:url("'+this.chosen+'");visibility:visible;');
    
    // console.log(l);
  }

  cancel(t:ITable){
    t.status="UNRESERVED";
    t.reserved_by_id=null;
    t.reserved_by=null;
    // console.log(t);
    this.provider.updateTable(t).then(res=>{
      alert("RESERVATION IS CANCELLED.\nSEE YOU LATER!");
    });
    this.reserved_tables.splice(this.reserved_tables.indexOf(t),1)
    
  }
  
}
