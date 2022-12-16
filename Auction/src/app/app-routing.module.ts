import {NgModule} from '@angular/core';
<<<<<<< HEAD
import {Routes, RouterModule} from '@angular/router';
=======
import {RouterModule, Routes} from '@angular/router';
import {GuideListComponent} from './component/guide/guide-list/guide-list.component';
import {AuctionProductDetailComponent} from './component/auction/auction-product-detail/auction-product-detail.component';
>>>>>>> 3b5547d1b981ef4353256cdb4c4f4146a90c546a
import {ProductAddComponent} from './component/product/product-add/product-add.component';
import {ProductEditComponent} from './component/product/product-edit/product-edit.component';
import {TransactionComponent} from './component/transaction/transaction.component';
import {HomeComponent} from './component/home/home.component';
import {UserListComponent} from './component/user/user-list/user-list.component';
import {UserEditComponent} from './component/user/user-edit/user-edit.component';
<<<<<<< HEAD
import {UserAddComponent} from './component/user/user-add/user-add.component';
import {LockaccountUserComponent} from './component/user/lockaccount-user/lockaccount-user.component';
=======
import {ListProductsComponent} from './component/product/list-products/list-products.component';
>>>>>>> 3b5547d1b981ef4353256cdb4c4f4146a90c546a

const routes: Routes = [

  {
<<<<<<< HEAD
    path: 'product/add',
=======
    path: 'products',
    component: ListProductsComponent,
  },
  {
    path: 'product/create',
>>>>>>> 3b5547d1b981ef4353256cdb4c4f4146a90c546a
    component: ProductAddComponent
  },
  {
    path: 'product/edit',
    component: ProductEditComponent
  },

<<<<<<< HEAD
  {
    path: 'aa',
    component: TransactionComponent
  },
=======
  {path:'transaction', component: TransactionComponent},
>>>>>>> 3b5547d1b981ef4353256cdb4c4f4146a90c546a

  {
    path: 'home',
    component: HomeComponent
<<<<<<< HEAD
=======

>>>>>>> 3b5547d1b981ef4353256cdb4c4f4146a90c546a
  },
  {
    path: 'user/list',
    component: UserListComponent
  },
  {
    path: 'user/edit',
    component: UserEditComponent
  },
  {
<<<<<<< HEAD
    path: 'user/add',
    component: UserAddComponent
  },
  {
    path: 'user/lockaccount',
    component: LockaccountUserComponent
  }
=======
    path: 'product/add',
    component: ProductAddComponent
  }, {
    path: 'guide',
    component: GuideListComponent
  },
  {
    path: 'auction/:productId', component: AuctionProductDetailComponent,
>>>>>>> 3b5547d1b981ef4353256cdb4c4f4146a90c546a

  }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
