import {FC, SVGProps} from "react";

export type BaseButtonColors = "default" | "blue" | "green" | "red";

export type BaseButtonPosition = {
  rowSpan?: number;
  colSpan?: number;
  rowStart?: number;
  colStart?: number;
}

export type BaseButtonSharedProps = BaseButtonPosition & {
  disabledIcon?: FC<SVGProps<SVGSVGElement>>;
}