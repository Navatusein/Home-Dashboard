import {EntityNameSensor} from "@/shared/types/ha-domains";
import {ColorToken} from "@/shared/constants/colors";

export type HistoryChartSeries = {
  name: string;
  entity: EntityNameSensor;
  color: ColorToken;
}
