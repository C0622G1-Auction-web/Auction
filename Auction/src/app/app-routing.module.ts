import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GuideListComponent} from './component/guide/guide-list/guide-list.component';
import {AuctionProductDetailComponent} from './component/auction/auction-product-detail/auction-product-detail.component';
import {ProductAddComponent} from './component/product/product-add/product-add.component';
import {ProductEditComponent} from './component/product/product-edit/product-edit.component';
import {TransactionComponent} from './component/transaction/transaction.component';
import {HomeComponent} from './component/home/home.component';
import {UserListComponent} from './component/user/user-list/user-list.component';
import {UserEditComponent} from './component/user/user-edit/user-edit.component';
import {UserAddComponent} from './component/user/user-add/user-add.component';
import {LockaccountUserComponent} from './component/user/lockaccount-user/lockaccount-user.component';
import {ListProductsComponent} from './component/product/list-products/list-products.component';
import {ProductReviewComponent} from './component/product/product-review/product-review.component';

const routes: Routes = [
  {
    path: 'products',
    component: ListProductsComponent,
  },
  {
    path: 'products/review/:id',
    component: ProductReviewComponent,
  },
  {
    path: 'product/create',
    component: ProductAddComponent
  },
  {
    path: "product/edit/:id",
    component: ProductEditComponent
  },
  {
    path: 'transaction',
    component: TransactionComponent
  },
  {
    path: 'aa',
    component: TransactionComponent
  },

  {path: 'transaction', component: TransactionComponent},

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'user/list',
    component: UserListComponent
  },
  {
    path: 'user/edit/:id',
    component: UserEditComponent
  },
  {
    path: 'user/add',
    component: UserAddComponent
  },
  {
    path: 'user/lockaccount',
    component: LockaccountUserComponent
  },
  {
    path: 'product/add',
    component: ProductAddComponent
  }, {
    path: 'guide',
    component: GuideListComponent
  },
  {
    path: 'auction/:productId', component: AuctionProductDetailComponent,

  }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
