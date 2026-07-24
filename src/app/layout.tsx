import "@/shared/styles/theme.scss"
import "@/shared/styles/global.scss"

import type {Metadata, Viewport} from "next";
import {ReactNode} from "react";
import {BaseLayout} from "@/app/layouts/base-layout";
import {ServiceWorker} from "@/features/service-worker";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home Dashboard",
  description: "Smart home dashboard",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Dashboard",
  },
  icons: {
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

type Props = {
  children: ReactNode;
}

export default function Layout(props: Props) {
  return (
    <html lang="en" data-lt-installed={true} suppressHydrationWarning={true} data-color-theme="dark">
      <body>
        <ServiceWorker/>
        <BaseLayout>
          {props.children}
        </BaseLayout>
      </body>
    </html>
  );
}
