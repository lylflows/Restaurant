import { Component,OnInit,Input } from '@angular/core';
import { Provider } from '@angular/compiler/src/core';
import { ProviderService } from './shared/services/provider.service';
import { IUser, IOrder } from './shared/models/models';
import { logging } from 'protractor';
import { isNull } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'front';
  public isEmployee = false;
  public authorized = false;
  @Input() logging=false;
  public LOGIN=true;
  public login='';
  public password='';
  public email='';
  
  public empID: number;
  public user: IUser;
  public users: IUser[] = [];
  public toc: string;
  public st: string[] = [];
  public log: string;

  public isOrders: boolean = true;
  public empOrders: IOrder[] = [];
  public undOrders: IOrder[] = [];
  public myOrders: IOrder[] = [];
  public doneOrders:IOrder[]=[];
constructor(private provider:ProviderService){

}
  ngOnInit(){
    const us=localStorage.getItem('username');
    const token=localStorage.getItem('token');
    
    if(token){
      
      this.provider.getOrders().then(ords => {
        this.empOrders = ords;
        for (let i of this.empOrders) {
          if (i.status === "UNDONE") {
            this.undOrders.push(i);
          }
          if(!isNull(i.handler)){
            if(i.handler.username === localStorage.getItem('username')&&i.status!=="DONE"){
              this.myOrders.push(i);
            }
            if(i.handler.username === localStorage.getItem('username')&&i.status==="DONE"){
              this.doneOrders.push(i);
            }
          }
        }
      });
      this.authorized=true;
      console.log(this.myOrders);
      console.log(us);
      console.log(this.isEmployee);
    }
    this.provider.getUsers().then(r => {
      this.users = r;
      console.log(this.users);
      for (let i of this.users) {
        // console.log(i);
        if (i.is_staff === true && i.username === localStorage.getItem('username')) {
          this.isEmployee = true;
          // console.log(i);
        }
      }
    });
    
    
  }
  public userIsAuth() {
    if(this.login!=='' &&this.password!==''){
      console.log("ok1");
      this.provider.auth(this.login,this.password).then(res=>{
        // console.log(this.login);
        // console.log(res.token);
        console.log("ok2");
        localStorage.setItem('token',res.token);
        localStorage.setItem('username',res.username);
        if(localStorage.getItem('token')){
          this.authorized=true;
        }
        alert( "Welcome, "+res.username+"!");
        location.reload();

      });
    }
    
  }
  logout() {
    this.provider.logout().then(res => {
      localStorage.clear();
      this.authorized= false;
      this.isEmployee=false;
    });
  }
  changeForm(){
    let el=document.getElementById("b1");
    let el2=document.getElementById("b2");
    if(this.LOGIN){
      if(el2.style.borderBottom==="none"){
        this.LOGIN=false;
        el2.style.borderBottom=el.style.borderBottom;
        el.style.borderBottom="none";
        this.login='';
        this.email='';
        this.password='';
        console.log( this.login);
      }
    }else{
      if(el.style.borderBottom==="none"){
        this.LOGIN=true;
        el.style.borderBottom=el2.style.borderBottom;
        el2.style.borderBottom="none";
        this.login='';
        this.email='';
        this.password='';
        console.log( this.login);
      }
    }

  }
  createUser(){
    
    if(this.login=='' ||this.password==''||this.email==''){
      alert("You must fill all fields.");
    }else if(this.password.length<8){
      alert("Password length must be 8 or more chars.");
    }else if(!this.email.includes("@")||!this.email.includes('.')){
      alert("Invalid email address.");
    }
    
    if( this.login!==''&&this.password!==''&&this.email!==''&&this.password.length>=8){
      this.provider.createUser(this.login,this.password,this.email).then(res=>{
        this.userIsAuth();
        
      });
    }
  }
  undoneOrders() {
    for (let i of this.empOrders) {
      if (i.status === "UNDONE") {
        this.undOrders.push(i);
      }
    }
  }
takeOrder(o: IOrder) {
    for (let k of this.users) {
      if (k.username === localStorage.getItem('username')) {
        this.user = k;
        // console.log(this.user.id);
        this.provider.takeOrder(o, "IN PROCESS", o.sender_id , this.user.id, o.meals).then(withHandler => {
          console.log(withHandler);
          // o = withHandler;
          this.provider.getOrders().then(rt => {
            this.empOrders = rt;
            location.reload();
          });
        });
      }
    }
    console.log(this.user);
  }

  doOrder(o: IOrder) {
    for (let k of this.users) {
      if (k.username === localStorage.getItem('username')) {
        this.user = k;
        // console.log(this.user.id);
        this.provider.takeOrder(o, "DONE", o.sender_id , this.user.id, o.meals).then(withHandler => {
          console.log(withHandler);
          // o = withHandler;
          this.provider.getOrders().then(rt => {
            this.empOrders = rt;
            location.reload();
          });
        });
      }
    }
    console.log(this.user);
  }
  toMyOrders(){
    this.isOrders = false;
  }
  toUndoneOrders(){
    this.isOrders = true;
  }
  back(){
    this.logging=false;
  }

}
