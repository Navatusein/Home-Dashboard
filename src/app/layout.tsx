import "@/shared/styles/theme.scss"
import "@/shared/styles/global.scss"

import type {Metadata} from "next";
import {ReactNode} from "react";
import {BaseLayout} from "@/app/layouts/base-layout";

export const metadata: Metadata = {
  title: "Home Dashboard",
  description: "Smart home dashboard",
};

type Props = {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return (
    <html lang="en" data-lt-installed={true} suppressHydrationWarning={true} data-color-theme="dark">
      <body>
        <BaseLayout>
          {props.children}
        </BaseLayout>
      </body>
    </html>
  );
}
