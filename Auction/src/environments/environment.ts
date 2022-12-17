// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url_list_price_step: 'http://localhost:8080/api/v1/pricestep',
  api_url_list_category: 'http://localhost:8080/api/v1/category',
  api_url_list_user: 'http://localhost:8080/api/v1/users',
  api_url_list_img_url: 'http://localhost:8080/api/v1/users/{id}',
  API_URL_AUCTION: "http://localhost:8080/auction/api",
  API_URL_GUIDE:'http://localhost:8080/auction/v1/api/guide',
  firebaseConfig: {
    apiKey: "AIzaSyBFqqq1BOcFnqRPAx_Vq8ewdQiAUPkJbrE",
    authDomain: "eng-cogency-370914.firebaseapp.com",
    databaseURL: "https://eng-cogency-370914-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "eng-cogency-370914",
    storageBucket: "eng-cogency-370914.appspot.com",
    messagingSenderId: "985488924079",
    appId: "1:985488924079:web:28e91f3779f4563b42235a",
    measurementId: "G-M2T7R4CP93"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
