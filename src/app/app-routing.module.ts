import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorScreenComponent } from './error-screen/error-screen.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
  {path:'', redirectTo: '/productsList', pathMatch:'full'},
  {path:'productsList',component:ProductsListComponent},
  {path:'viewProduct/:id', component:ViewProductComponent},
  {path:'errorScreen', component:ErrorScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
