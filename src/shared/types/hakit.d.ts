import { DefaultServices, ServiceFunction, ServiceFunctionTypes } from "@hakit/core";

declare module "@hakit/core" {
  export interface CustomSupportedServices<T extends ServiceFunctionTypes = "target"> extends DefaultServices<T> {
    fullyKiosk: {
      loadUrl: ServiceFunction<object, T, {url: string}>;
      startApplication: ServiceFunction<object, T, {application: string}>;
      setConfig: ServiceFunction<object, T, {key: string; value: string}>;
    };
    musicAssistant: {
      getLibrary: ServiceFunction<object, T, {config_entry_id: string; media_type: string; limit?: number; offset?: number; search?: string; order_by?: string}>;
      playMedia: ServiceFunction<object, T, {media_id: string; media_type?: string; start_item?: string}>;
      getQueue: ServiceFunction<object, T, object>;
      transferQueue: ServiceFunction<object, T, {source_player: string; auto_play?: boolean}>;
    };
    vacuum: DefaultServices<T>["vacuum"] & {
      cleanArea: ServiceFunction<object, T, {cleaning_area_id: string[]}>;
    };
  }
}
