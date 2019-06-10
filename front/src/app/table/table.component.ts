import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../shared/services/provider.service';
import { ITable, IUser } from '../shared/models/models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  public tables:ITable[]=[];
  public users:IUser[]=[];
  public user:IUser;
  public search='';
  public reserved:ITable[]=[];
  constructor( private provider: ProviderService) { }
  ngOnInit(){
    const username=localStorage.getItem('username');
    this.provider.getTables().then(res => {
      this.tables = res;
      // console.log(res);
      this.provider.getUsers().then(res=>{
        this.users=res;
        this.users.forEach(i=>{
          if(i.username===username){
            this.user=i;
            for(let t of this.tables){
              if(t.reserved_by_id===i.id){
                this.reserved.push(t);
                console.log(this.reserved);
              }
            }
          }
        });
      });
    });
    
  }

checkSt(c:ITable){
  if(c.status=="RESERVED"){
    return true;
  }
  return false;

}
makeReservation(c:ITable){
  if( c.status=="RESERVED"){
    alert("SORRY, BUT THIS TABLE HAS BEEN ALREADY\nRESERVED BY SOMEONE...\nAND YOU CAN'T CANCEL THIS RESERVATION.");
  }else if(this.reserved.length>0){
    alert("SORRY, BUT YOU HAVE BEEN ALREADY RESERVED ONE TABLE...\nYOU CAN DELETE YOUR RESERVATION IN PROFILE.");
  }else{
    
    c.status="RESERVED";
    c.reserved_by_id=this.user.id;
    console.log(this.user.id);
    console.log(c);
      // console.log(this.user);
      // console.log(c.reserved_by);
      // console.log(c);
      this.provider.getUserByID(c.reserved_by_id).then(r=>{
        c.reserved_by=r;
      });
      console.log(c.reserved_by);
    this.provider.updateTable(c).then(res=>{
      
    });
    this.reserved.push(c);
    alert("RESERVATION IS SUCCESSFULL. SEE YOU LATER!");
    // location.reload();
  }
}
searcH(){
  this.provider.searchTables(this.search).then(res=>{
    this.tables=res;
    console.log(res);
    this.provider.getUsers().then(res=>{
      this.users=res;
      this.users.forEach(i=>{
        if(i.username===localStorage.getItem('username')){
          this.user=i;
          for(let t of this.tables){
            if(t.reserved_by_id===i.id){
              this.reserved.push(t);
              console.log(this.reserved);
            }
          }
        }
      });
    });
  });
}
}
