"use client"

import {BootstrapGrid, Flex, ResponsiveToggler} from "@/shared/ui-kit";
import MapSegment from "../../segments/map-segment/map-segment";
import RoomsSegment from "../../segments/rooms-segment/rooms-segment";
import MusicSegment from "../../segments/music-segment/music-segment";
import SecuritySegment from "../../segments/security-segment/security-segment";
import PersonalModal from "../../modals/personal-modal/personal-modal";
import StatusSegment from "../../segments/status-segment/status-segment";
import SmallBedroomModal from "../../modals/small-bedroom-modal/small-bedroom-modal";
import LargeBedroomModal from "../../modals/large-bedroom-modal/large-bedroom-modal";
import LivingRoomModal from "../../modals/living-room-modal/living-room-modal";
import SmallCorridorModal from "../../modals/small-corridor-modal/small-corridor-modal";
import BathroomModal from "../../modals/bathroom-modal/bathroom-modal";
import RestroomModal from "../../modals/restroom-modal/restroom-modal";
import KitchenModal from "../../modals/kitchen-modal/kitchen-modal";
import LargeCorridorModal from "../../modals/large-corridor-modal/large-corridor-modal";
import VacuumModal from "../../modals/vacuum-modal/vacuum-modal";
import ClimateModal from "../../modals/climate-modal/climate-modal";
import WeatherModal from "../../modals/weather-modal/weather-modal";
import MapModal from "../../modals/map-modal/map-modal";
import {InfoCard} from "@/widgets/home-assistant-cards/info-card";
import {WelcomeCard} from "@/widgets/home-assistant-cards/welcome-card";
import {EntityNamePerson} from "@/shared/types/ha-domains";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useBreakpoint} from "@/shared/hooks/use-breakpoint";

const WELCOME_PERSONS: EntityNamePerson[] = ["person.bogdan", "person.iulia"];

export default function HomeView() {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useBreakpoint("sm");
  const [mapFocus, setMapFocus] = useState<{key: string}>();

  const openPersonOnMap = (person: EntityNamePerson) => {
    router.push(`${pathname}?modal=map&person=${person}`);
  }

  return (
    <Flex vertical gap="sm">
      <ResponsiveToggler breakpoint="sm" hide>
        <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
          <BootstrapGrid.Column span={16} md={24}>
            <InfoCard/>
          </BootstrapGrid.Column>
        </BootstrapGrid.Row>
      </ResponsiveToggler>
      <ResponsiveToggler breakpoint="sm">
        <Flex vertical gap="sm">
          <WelcomeCard
            persons={WELCOME_PERSONS}
            room="Small Bedroom"
            onPersonClick={openPersonOnMap}
          />
          <StatusSegment/>
        </Flex>
      </ResponsiveToggler>
      <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
        <BootstrapGrid.Column span={16} md={{span: 24, order: 2}}>
          <Flex vertical gap="sm">
            <ResponsiveToggler breakpoint="sm" hide>
              <StatusSegment/>
            </ResponsiveToggler>
            <MapSegment focus={mapFocus}/>
            <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
              <BootstrapGrid.Column span={12} md={24}>
                <MusicSegment/>
              </BootstrapGrid.Column>
              {!isMobile && (
                <BootstrapGrid.Column span={12} md={24}>
                  <SecuritySegment onPersonClick={(person) => setMapFocus({key: person})}/>
                </BootstrapGrid.Column>
              )}
            </BootstrapGrid.Row>
          </Flex>
        </BootstrapGrid.Column>
        <BootstrapGrid.Column span={8} md={{span: 24, order: 1}}>
          <RoomsSegment/>
        </BootstrapGrid.Column>
      </BootstrapGrid.Row>
      <SmallBedroomModal/>
      <LargeBedroomModal/>
      <LivingRoomModal/>
      <LargeCorridorModal/>
      <SmallCorridorModal/>
      <BathroomModal/>
      <RestroomModal/>
      <KitchenModal/>
      <PersonalModal/>
      <VacuumModal/>
      <ClimateModal/>
      <WeatherModal/>
      <MapModal/>
    </Flex>
  )
}
