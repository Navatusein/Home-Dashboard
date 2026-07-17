"use client"

import {ReactNode} from "react";
import {Grid} from "@/shared/ui-kit";
import {BaseButton} from "@/widgets/terminal-buttons/base-button";
import {InfoButton} from "@/widgets/terminal-buttons/info-button";
import {RoutingButton} from "@/widgets/terminal-buttons/routing-button";
import {buildHaPath, buildPath} from "@/shared/helpers/terminal-path-builder";
import BulbIcon from "@public/icons/home-automation-and-buildings/bulb.svg";
import SettingsIcon from "@public/icons/devices-and-networks/settings.svg";
import MovieActionBoardIcon from "@public/icons/streaming-and-socials/movie-action-board.svg";
import Home2Icon from "@public/icons/home-automation-and-buildings/home-2.svg";
import ReportAnalyticsIcon from "@public/icons/commerce/report-analytics.svg";
import {useRouter} from "next/navigation";

type Props = {
  children: ReactNode;
}

export default function Layout(props: Props) {
  const router = useRouter();

  const navigateToHomeAssistant = () => {
    router.push(buildHaPath(true));
  }

  return (
    <>
      <Grid.Section rowStart={1}>
        <RoutingButton title="Light" icon={BulbIcon} path={buildPath("light")}/>
        <RoutingButton title="System" icon={SettingsIcon} path={buildPath("system")}/>
        <RoutingButton title="Record" icon={MovieActionBoardIcon} path={buildPath("record")}/>
        <BaseButton title="HA" icon={Home2Icon} onClickAction={() => navigateToHomeAssistant()}/>
        <RoutingButton title="Faker" icon={ReportAnalyticsIcon} path={buildPath("faker")}/>
        <InfoButton/>
        <BaseButton/>
        <BaseButton/>
        <BaseButton/>
        <BaseButton/>
        <BaseButton/>
      </Grid.Section>
      {props.children}
    </>
  )
}