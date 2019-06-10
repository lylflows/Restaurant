import { NumberValueAccessor } from '@angular/forms/src/directives';

export interface IAuthResponse{
    token:string;
    username:string;
}
export interface ICategory{
    id: Number;
    name:string;
}
export interface IMeal{
    id:Number;
    name:string;
    count:number;
    price: number;
    description:string;
    image:string;
}
export interface IStock{
    id:Number;
    name:string;
    description:string;
    start_date: string;
    end_date:string;
}
export interface ITable{
    id:Number;
    number_of_seats:Number;
    status:string;
    reserved_by_id:number;
    reserved_by:IUser;
}
export interface IUser {
    id: number;
    password: string;
    // last_login: string;
    // is_superuser: boolean;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    is_staff: boolean;
    // is_active: boolean;
    // date_joined: string;
    // groups: any[];
    // user_permissions: any[];
}
export interface IOrder{
    id:Number;
    meals:string;
    status:string;
    sender_id:number;
    sender:any;
    handler:any;
    total_price:number;
    handler_id:number;

}
export interface ICard{
    id:number;
    discount:number;
    owner:IUser;
    owner_id:number;
    start_date:string;
    end_date:string;
    type:string;
}
export interface IMessage{
    id:number;
    text:string;
    sender_mail:string;
    sender_pass:string;
    dest_mail:string;
}