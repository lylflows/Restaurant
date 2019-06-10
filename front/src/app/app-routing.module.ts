import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AboutComponent } from './about/about.component';
import { StocksComponent } from './stocks/stocks.component';
import { OrdersComponent } from './orders/orders.component';
import { TableComponent } from './table/table.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: '',
    component: AboutComponent
  },
  {
    path: 'stocks',
    component: StocksComponent
  },
  {
    path: 'reservation',
    component: TableComponent
  },
  {
    path: 'order',
    component: OrdersComponent
  },
  {
    path: 'users/:userLogin',
    component: ProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
