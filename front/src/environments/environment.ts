// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// dev
/*
export const environment = {
  production: false,
  sso : false,
  service: {
    id: '6qI21Y5lVZnfaeR',
    key: 'j3WCiLmPU5WMqS3GWfHxcYxXE'
  },
  api: {
    https: false,
    url: 'localhost',
    port: 5000,
    version: 'v1'
  },

  fileManager: {
    https: false,
    url: 'dev-vianote.velizy.lan',
    port: 3003
  },
  bugsnag: {
    apiKey: 'b992c87e9fa1f5d10c848c94ef48b6e8'
  }
};

*/
// https

export const environment = {
  production: false,
  sso : false,
  service: {
    id:'6qI21Y5lVZnfaeR',
    key: 'j3WCiLmPU5WMqS3GWfHxcYxXE'
  },
  api: {
    https: true,
    url: 'annot-theradia.imag.fr',
    port: '',
    version: 'v1'
  },

  fileManager: {
    https: false,
    url: 'dev-vianote.velizy.lan',
    port: 30003
  },
  bugsnag: {
    apiKey: 'b992c87e9fa1f5d10c848c94ef48b6e8'
  }
};


// http
/*export const environment = {
  production: false,
  sso : false,
  service: {
    id:'6qI21Y5lVZnfaeR',
    key: 'j3WCiLmPU5WMqS3GWfHxcYxXE'
  },
  api: {
    https: false,
    url: 'annot-theradia.imag.fr',
    port: 30000,
    version: 'v1'
  },

  fileManager: {
    https: false,
    url: 'dev-vianote.velizy.lan',
    port: 30003
  },
  bugsnag: {
    apiKey: 'b992c87e9fa1f5d10c848c94ef48b6e8'
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

