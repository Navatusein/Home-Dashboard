import {ReactNode} from "react";
import {NavbarCardItem} from "@/widgets/home-assistant-cards/navbar-card";
import {
  mdiAccountCircle,
  mdiBedKing,
  mdiBedQueen, mdiDotsHorizontal,
  mdiHome, mdiMusic,
  mdiPaperRoll, mdiServer, mdiShieldHome,
  mdiShoePrint,
  mdiBathtub,
  mdiSilverwareForkKnife,
  mdiSofa, mdiLightningBolt
} from "@mdi/js";
import {HomeAssistantDashboardLayout} from "@/app/layouts/home-assistant-dashboard-layout";

type Props = {
  children: ReactNode;
}

const NavbarCardItems: NavbarCardItem[] = [
  {
    title: "Home",
    path: "/home-assistant/home",
    color: "teal",
    icon: mdiHome
  },
  {
    title: "Rooms",
    color: "teal",
    icon: mdiSofa,
    children: [
      {
        title: "Small Bedroom",
        color: "teal",
        icon: mdiBedQueen,
        path: "/home-assistant/home",
        modal: "small-bedroom",
      },
      {
        title: "Large Bedroom",
        color: "teal",
        icon: mdiBedKing,
        path: "/home-assistant/home",
        modal: "large-bedroom",
      },
      {
        title: "Living room",
        color: "teal",
        icon: mdiSofa,
        path: "/home-assistant/home",
        modal: "living-room",
      },
      {
        title: "Large Corridor",
        color: "teal",
        icon: mdiShoePrint,
        path: "/home-assistant/home",
        modal: "large-corridor",
      },
      {
        title: "Small Corridor",
        color: "teal",
        icon: mdiShoePrint,
        path: "/home-assistant/home",
        modal: "small-corridor",
      },
      {
        title: "Bathroom",
        color: "teal",
        icon: mdiBathtub,
        path: "/home-assistant/home",
        modal: "bathroom",
      },
      {
        title: "Restroom",
        color: "teal",
        icon: mdiPaperRoll,
        path: "/home-assistant/home",
        modal: "restroom",
      },
      {
        title: "Kitchen",
        color: "teal",
        icon: mdiSilverwareForkKnife,
        path: "/home-assistant/home",
        modal: "kitchen",
      },
    ]
  },
  {
    title: "Music",
    path: "/home-assistant/music",
    color: "green",
    icon: mdiMusic
  },
  {
    title: "Energy",
    path: "/home-assistant/energy",
    color: "yellow",
    icon: mdiLightningBolt,
    hideOnMobile: true,
  },
  {
    title: "Security",
    path: "/home-assistant/security",
    color: "red",
    icon: mdiShieldHome
  },
  {
    title: "Personal",
    path: "/home-assistant/home",
    modal: "personal",
    color: "teal",
    icon: mdiAccountCircle
  },
  {
    title: "Other",
    color: "blue",
    icon: mdiDotsHorizontal,
    children: [
      {
        title: "Server",
        color: "blue",
        icon: mdiServer,
        path: "/home-assistant/server",
      },
    ]
  }
]

export default function Layout(props: Props) {
  return (
    <HomeAssistantDashboardLayout navbarItems={NavbarCardItems}>
      {props.children}
    </HomeAssistantDashboardLayout>
  )
}