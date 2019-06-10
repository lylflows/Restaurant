import { Injectable } from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {IAuthResponse, ICategory,IMeal, IStock, ITable, IUser, IOrder, ICard, IMessage} from '../models/models'

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService {

  constructor(http: HttpClient) {
   super(http);
  }
  auth(login: any, password: any): Promise<IAuthResponse> {
    return this.post('http://127.0.0.1:8000/main/login/', {
      username: login,
      password: password,
      
    });
  }

  logout(): Promise<any> {
    return this.post('http://127.0.0.1:8000/main/logout/', {
    });
  }
  getCategories():Promise<ICategory[]>{
    return this.get('http://127.0.0.1:8000/main/categories/',{});
  }
  getMeals(category:ICategory):Promise<IMeal[]>{
    return this.get(`http://127.0.0.1:8000/main/categories/${category.id}/meals/`,{});
  }
  getStocks():Promise<IStock[]>{
    return this.get(`http://127.0.0.1:8000/main/stocks/`,{});
  }
  getOneStock(i:IStock ):Promise<IStock>{
    return this.get(`http://127.0.0.1:8000/main/stocks/${i.id}/`,{});
  }
  getTables():Promise<ITable[]>{
    return this.get(`http://127.0.0.1:8000/main/tables/`,{});
  }
  updateTable(t:ITable):Promise <ITable>{
    console.log("i am here");
    return this.put(`http://127.0.0.1:8000/main/tables/${t.id}/`,{
      status:t.status,
      reserved_by_id:t.reserved_by_id,
      reserved_by:t.reserved_by
      
    });
    
  }
  getUserByID(id: Number): Promise<IUser> {
    return this.get(`http://localhost:8000/main/users/${id}/`, {
    });
  }

getUsers(): Promise<IUser[]> {
    return this.get(`http://localhost:8000/main/users/`, {});
  }
getOrders():Promise<IOrder[]>{
  return this.get(`http://127.0.0.1:8000/main/orders/`, {});
}
searchOrders(s:string):Promise<IOrder[]>{
  return this.get(`http://127.0.0.1:8000/main/orders/?status=${s}`, {});
}
createOrder(meals: string, user: IUser, price: number): Promise<IOrder> {
  return this.post(`http://127.0.0.1:8000/main/orders/`, {
    meals: meals,
    status: "UNDONE",
    total_price: price,
    sender_id: user.id,
    handler: null,
    handler_id: null,
  });
}
getAllMeals():Promise<IMeal[]>{
  return this.get(`http://127.0.0.1:8000/main/meals/`, {});
}
searchTables(s:string):Promise<ITable[]>{
  return this.get(`http://127.0.0.1:8000/main/tables/?search=${s}`,{});
}
createUser(username:string,password:string,email:string):Promise<IUser>{
  return this.post(`http://127.0.0.1:8000/main/users/create/`,{
    username:username,
    password:password,
    email:email,
    first_name:null,
    last_name:null,
    is_staff:false
  });
}
getCards():Promise<ICard[]>{
  return this.get(`http://127.0.0.1:8000/main/cards/`,{});
}
createCard(discount:number,owner_id:number,type:string):Promise<ICard>{
  return this.post(`http://127.0.0.1:8000/main/cards/`,{
    discount:discount,
    owner_id:owner_id,
    type:type,
  });
}
updateCardDetail(i:ICard):Promise<ICard>{
  return this.put(`http://127.0.0.1:8000/main/cards/${i.id}/`,{
    discount:i.discount,
    owner_id:i.owner_id,
    type:i.type,
  });
}
takeOrder(or: IOrder, st: string, id: number, userID: number, mls: string): Promise<IOrder> {
  return this.put(`http://localhost:8000/main/orders/${or.id}/`, {
    status: st,
    sender_id: id,
    handler_id: userID,
    meals: mls,
    total_price:or.total_price
  });
}
updateUser(i:IUser):Promise<IUser>{
  return this.put(`http://localhost:8000/main/users/${i.id}/`,{
    email:i.email,
    password:i.password,
    username:i.username,
    first_name:i.first_name,
    last_name:i.last_name
  });
}
sendMessage(i:string,email:string):Promise<IMessage>{
  return this.post('http://localhost:8000/main/send/',{
    dest_mail:email,
    text: i
  });
}
}
