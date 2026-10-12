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
import {InfoCard} from "@/widgets/home-assistant-cards/info-card";
import {WelcomeCard, WelcomeCardPerson} from "@/widgets/home-assistant-cards/welcome-card";

const WELCOME_PERSONS: WelcomeCardPerson[] = [
  {entity: "person.bogdan", imageUrl: "/users/bohdan.jpg"},
  {entity: "person.iulia", imageUrl: "/users/julia.png"},
]

export default function HomeView() {
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
            <MapSegment/>
            <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
              <BootstrapGrid.Column span={12} md={24}>
                <MusicSegment/>
              </BootstrapGrid.Column>
              <BootstrapGrid.Column span={12} md={24}>
                <SecuritySegment/>
              </BootstrapGrid.Column>
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
    </Flex>
  )
}
