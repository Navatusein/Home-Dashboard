import {ColorToken} from "@/shared/constants/colors";

export type NavbarCardItem = {
  title: string;
  icon: string;
  color: ColorToken;
  hideOnMobile?: boolean;
  path?: string;
  modal?: string;
  children?: NavbarCardItemChild[];
  forUsers?: string[];
}

export type NavbarCardItemChild = Omit<NavbarCardItem, "children">;