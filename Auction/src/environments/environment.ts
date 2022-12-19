// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDV8RZyn7riFw087ES5nA05z4ON5axBO28",
    authDomain: "test-42050.firebaseapp.com",
    databaseURL: "https://test-42050-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "test-42050",
    storageBucket: "test-42050.appspot.com",
    messagingSenderId: "902879698828",
    appId: "1:902879698828:web:2d7346b0c1c599d08540a9",
    measurementId: "G-XEHPX24EFX"
  },
  API_URL_AUCTION: 'http://localhost:8080/api/v1/auction',
  api_url_list_price_step: 'http://localhost:8080/api/v1/pricestep',
  api_url_list_category: 'http://localhost:8080/api/v1/category',
  api_url_list_user: 'http://localhost:8080/api/v1/users',
  api_url_list_img_url: 'http://localhost:8080/api/v1/users/{id}',
  // API_URL_AUCTION: 'http://localhost:8080/auction/api',
  api_url_order_status: 'http://localhost:8080/api/v1/payments',
<<<<<<< HEAD
  categoryUrl: 'http://localhost:8080/api/v1/products/category',
  priceStepUrl: 'http://localhost:8080/api/v1/products/priceStep',
  transactionUrl: 'http://localhost:8080/auction/api/transaction',
  productSearchUrl: 'http://localhost:8080/api/v1/products/search',
  userUrl: 'http://localhost:8080/api/user/v1/',
  SIGN_IN_API: 'http://localhost:8080/api/v1/auth/signin',
  GOOGLE_SIGN_IN_API: 'http://localhost:8080/api/v1/auth/google',
  uri_api_create_user_v1_user:"http://localhost:8080/api/v1/users/create",
};
=======
  categoryUrl: "http://localhost:8080/api/v1/products/category",
  priceStepUrl: "http://localhost:8080/api/v1/products/priceStep",
  transactionUrl: "http://localhost:8080/auction/api/transaction",
  productSearchUrl: "http://localhost:8080/api/v1/products/search",
  userUrl: "http://localhost:8080/api/user/v1/",
  uri_api_create_user_v1_user: "http://localhost:8080/api/v1/users/create",
  uri_api_update_user_v1_user: "http://localhost:8080/api/v1/users/update",
  uri_api_find_by_id_user_v1_user: "http://localhost:8080/api/v1/users/find/",
  firebaseConfig: {
    apiKey: "AIzaSyDRWAv_6CkY0N5ocqceEDbh5gc2UankMXo",
    authDomain: "truonglh-68106.firebaseapp.com",
    projectId: "truonglh-68106",
    storageBucket: "truonglh-68106.appspot.com",
    messagingSenderId: "680493532790",
    appId: "1:680493532790:web:4d7b3923a9e9d4f00ac157",
    measurementId: "G-YRDCYMF4H9"
  },
  LOGIN_API: 'http://localhost:8080/api/auth/login',
  GOOGLE_LOGIN_API: 'http://localhost:8080/api/auth/google',
  DIA_GIOI_VIETNAM_API: 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
  uri_api_create_user_v1_user:"http://localhost:8080/api/v1/users/create"
>>>>>>> f4f689efca083ce6b451b5211af36ead99819b55

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
