import {FC, SVGProps} from "react";
import {BaseButtonColors} from "../types/type";

export type BaseButtonStatefulVisualProps = {
  icon?: FC<SVGProps<SVGSVGElement>>;
  iconEnabled?: FC<SVGProps<SVGSVGElement>>;
  iconDisabled?: FC<SVGProps<SVGSVGElement>>;
  color?: BaseButtonColors;
  colorEnabled?: BaseButtonColors;
  colorDisabled?: BaseButtonColors;
  image?: string;
  imageEnabled?: string;
  imageDisabled?: string;
}

export function resolveStatefulVisuals(
  active: boolean,
  {
    icon, iconEnabled, iconDisabled,
    color, colorEnabled, colorDisabled,
    image, imageEnabled, imageDisabled,
  }: BaseButtonStatefulVisualProps
) {
  return {
    icon: icon ?? (active ? iconEnabled : iconDisabled),
    color: color ?? (active ? colorEnabled : colorDisabled),
    image: image ?? (active ? imageEnabled : imageDisabled),
  };
}