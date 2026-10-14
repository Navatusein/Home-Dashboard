import {EntityNameSensor} from "@/shared/types/ha-domains";
import {ColorToken} from "@/shared/constants/colors";

export type PowerFlowNode = {
  title: string;
  entity: EntityNameSensor;
  color: ColorToken;
  coversLoss?: boolean;
  untrackedTitle?: string;
  hidden?: boolean;
  children?: PowerFlowNode[];
}
