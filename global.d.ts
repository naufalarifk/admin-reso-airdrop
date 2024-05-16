// // import the original type declarations
// import "react-i18next";

// // import all namespaces (for the default language, only)
// import type en from "@/locales/en/index.ts";

// declare module "react-i18next" {
//   // and extend them!
//   interface CustomTypeOptions {
//     // custom resources type
//     resources: {
//       en: typeof en;
//     };
//   }
// }

type Messages = typeof import("./src/locales/en");

declare interface IntLMessages extends Messages {}
