// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // firebaseConfig: {
  //   apiKey: 'AIzaSyDV8RZyn7riFw087ES5nA05z4ON5axBO28',
  //   authDomain: 'test-42050.firebaseapp.com',
  //   databaseURL: 'https://test-42050-default-rtdb.asia-southeast1.firebasedatabase.app',
  //   projectId: 'test-42050',
  //   storageBucket: 'test-42050.appspot.com',
  //   messagingSenderId: '902879698828',
  //   appId: '1:902879698828:web:2d7346b0c1c599d08540a9',
  //   measurementId: 'G-XEHPX24EFX'
  // },
  firebaseConfig: {
    apiKey: "AIzaSyBFqqq1BOcFnqRPAx_Vq8ewdQiAUPkJbrE",
    authDomain: "eng-cogency-370914.firebaseapp.com",
    databaseURL: "https://eng-cogency-370914-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "eng-cogency-370914",
    storageBucket: "eng-cogency-370914.appspot.com",
    messagingSenderId: "985488924079",
    appId: "1:985488924079:web:28e91f3779f4563b42235a",
    measurementId: "G-M2T7R4CP93"
  },
  categoryUrl: 'http://localhost:8080/api/v1/products/category',
  priceStepUrl: 'http://localhost:8080/api/v1/products/priceStep',
  transactionUrl: 'http://localhost:8080/api/v1/auction/transaction',
  productSearchUrl: 'http://localhost:8080/api/v1/products/search',
  userUrl: 'http://localhost:8080/api/v1/users',
  urlAddAccountUser: 'http://localhost:8080/api/user/v1/add',
  api_url_products: 'http://localhost:8080/api/v1/products/search-by-admin',
  api_url_list_price_step: 'http://localhost:8080/api/v1/pricestep',
  api_url_list_category: 'http://localhost:8080/api/v1/category',
  api_url_list_user: 'http://localhost:8080/api/v1/users',
  api_url_list_img_url: 'http://localhost:8080/api/v1/users/{id}',
  API_URL_AUCTION: 'http://localhost:8080/api/v1/auction',
  api_url_order_status: 'http://localhost:8080/api/v1/payments',
  api_url_order_status_1: 'http://localhost:8080/api/v1/payments/find-by-list-id',
  API_TOP_USER: 'http://localhost:8080/api/user/v1/top',
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
  api_url_userType: 'http://localhost:8080/api/v1/users/usersType',
  productUrl: 'http://localhost:8080/api/v1/products',
  imageUrl: 'http://localhost:8080/api/v1/products/img',
  API_URL_GUIDE: 'http://localhost:8080/api/v1/guide',
  SIGN_IN_API: 'http://localhost:8080/api/v1/auth/signin',
  GOOGLE_SIGN_IN_API: 'http://localhost:8080/api/v1/auth/google',
  uri_api_create_user_v1_user: 'http://localhost:8080/api/v1/users/create',
  api_url_create_img_url: 'http://localhost:8080/api/v1/products/img/create',
  uri_api_update_user_v1_user: 'http://localhost:8080/api/v1/users/update',
  uri_api_find_by_id_user_v1_user: "http://localhost:8080/api/v1/users/getUserById",
  LOGIN_API: 'http://localhost:8080/api/v1/auth/login',
  GOOGLE_LOGIN_API: 'http://localhost:8080/api/v1/auth/google',
  DIA_GIOI_VIETNAM_API: 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
  api_url_list_user_list_id: 'http://localhost:8080/api/v1/users/find-by-list-id',
  api_url_get_imgs: 'http://localhost:8080/api/v1/products/imgs/',
  uri_api_find_all_user_v1:"http://localhost:8080/api/v1/users/findAll",
  api_url_product_history_list:'http://localhost:8080/api/v1/products/list/',
  api_url_product_auction_canceled:'http://localhost:8080/api/v1/products/canceled/',
  api_url_product_auction_history: 'http://localhost:8080/api/v1/auction/list/',
  NQV_LOCK_ACCOUNT:'http://localhost:8080/api/v1/users/lockUser',
  NQV_GET_ACCOUNT_BY_ID_API: 'http://localhost:8080/api/v1/accounts/getAccountById',
  api_url_shipping: 'http://localhost:8080/api/v1/payments/update',
  api_url_payment: 'http://localhost:8080/api/v1/payments/updates',
  URL_API_GETNOFICATION_BY_USER: 'http://localhost:8080/api/v1/nofications'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
