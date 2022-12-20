// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false, firebaseConfig: {
    apiKey: "AIzaSyDV8RZyn7riFw087ES5nA05z4ON5axBO28",
    authDomain: "test-42050.firebaseapp.com",
    databaseURL: "https://test-42050-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-42050",
    storageBucket: "test-42050.appspot.com",
    messagingSenderId: "902879698828",
    appId: "1:902879698828:web:2d7346b0c1c599d08540a9",
    measurementId: "G-XEHPX24EFX"
  },
  categoryUrl: 'http://localhost:8080/api/v1/products/category',
  priceStepUrl: 'http://localhost:8080/api/v1/products/priceStep',
  transactionUrl: 'http://localhost:8080/auction/api/transaction',
  productSearchUrl: 'http://localhost:8080/api/v1/products/search',
  userUrl: 'http://localhost:8080/api/v1/users',
  urlAddAccountUser: 'http://localhost:8080/api/user/v1/add',
  api_url_products: 'http://localhost:8080/api/v1/products/search-by-admin',
  api_url_list_price_step: 'http://localhost:8080/api/v1/pricestep',
  api_url_list_category: 'http://localhost:8080/api/v1/category',
  api_url_list_user: 'http://localhost:8080/api/v1/users',
  api_url_list_img_url: 'http://localhost:8080/api/v1/users/{id}',
  API_URL_AUCTION: 'http://localhost:8080/auction/api',
  api_url_order_status: 'http://localhost:8080/api/v1/payments',
  api_url_list_price_range: 'http://localhost:8080/api/v1/product-properties/price-range',
  api_url_list_auction_status: 'http://localhost:8080/api/v1/product-properties/auction-status',
  api_url_search_by_list_id: 'http://localhost:8080/api/v1/products/find-by-list-id',
  api_url_remove_products: 'http://localhost:8080/api/v1/products/remove',
  api_url_find_by_id: 'http://localhost:8080/api/v1/products/find-by-id/',
  api_url_review_product: 'http://localhost:8080/api/v1/products/review/',
  api_url_write_reason: 'http://localhost:8080/api/v1/products/reason',
  api_url_get_reason: 'http://localhost:8080/api/v1/products/reason/',
  api_url_do_not_review_product: 'http://localhost:8080/api/v1/products/do-not-review/',
  transactionDeleteUrl: 'http://localhost:8080/api/v1/auction/delete',
  transactionFindByListIdUrl: 'http://localhost:8080/api/v1/auction/find-by-list-id',
  api_url_userType: "http://localhost:8080/api/v1/users/usersType",
  productUrl: 'http://localhost:8080/api/v1/products',
  imageUrl: 'http://localhost:8080/api/v1/products/img',
  api_url_get_imgs: 'http://localhost:8080/api/v1/products/imgs/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
