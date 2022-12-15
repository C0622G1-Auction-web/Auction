import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuctionProductDetailComponent} from "./component/auction/auction-product-detail/auction-product-detail.component";


const routes: Routes = [
  {
    path: "auction/:productId", component: AuctionProductDetailComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
