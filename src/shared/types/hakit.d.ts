import { DefaultServices, ServiceFunction, ServiceFunctionTypes } from "@hakit/core";

declare module "@hakit/core" {
  export interface CustomSupportedServices<T extends ServiceFunctionTypes = "target"> extends DefaultServices<T> {
    fullyKiosk: {
      loadUrl: ServiceFunction<object, T, {url: string}>;
      startApplication: ServiceFunction<object, T, {application: string}>;
      setConfig: ServiceFunction<object, T, {key: string; value: string}>;
    };
  }
}
