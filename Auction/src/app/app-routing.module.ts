import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductAddComponent} from "./component/product/product-add/product-add.component";
import {ProductEditComponent} from "./component/product/product-edit/product-edit.component";
import {TransactionComponent} from "./component/transaction/transaction.component";
import {HomeComponent} from "./component/home/home.component";
import {UserListComponent} from "./component/user/user-list/user-list.component";
import {UserEditComponent} from "./component/user/user-edit/user-edit.component";

const routes: Routes = [
  {
    path: "product/create",
    component: ProductAddComponent
  },
  {
    path: "product/edit",
    component: ProductEditComponent
  },

  {path:"aa", component: TransactionComponent},

  {
    path:"home",
    component: HomeComponent

  },
  {
    path: "user/list",
    component: UserListComponent
  },
  {
    path: "user/edit",
    component: UserEditComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
