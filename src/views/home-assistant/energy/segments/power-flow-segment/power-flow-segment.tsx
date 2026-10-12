import {Flex, SegmentHeader} from "@/shared/ui-kit";
import {mdiTransitConnectionVariant} from "@mdi/js";
import {PowerFlowCard, PowerFlowNode} from "@/widgets/home-assistant-cards/power-flow-card";

const SOURCES: PowerFlowNode[] = [
  {
    title: "Battery",
    entity: "sensor.pylontech_battery_id_512_power_inverted",
    color: "green",
  },
  {
    title: "Grid",
    entity: "sensor.gx_device_grid_power_l1",
    color: "blue",
    coversLoss: true,
  },
]

const HOME: PowerFlowNode = {
  title: "Home",
  entity: "sensor.gx_device_consumption_power_l1",
  color: "teal",
  children: [
    {
      title: "Desktop",
      entity: "sensor.desktop_nas_wr01b_power",
      color: "purple",
      children: [
        {
          title: "Servers",
          entity: "sensor.servers_nas_wr01b_power",
          color: "pink",
          children: [
            {
              title: "Orion",
              entity: "sensor.orion_nas_wr01b_power",
              color: "orange",
            },
            {
              title: "Network",
              entity: "sensor.network_nas_wr01b_power",
              color: "red",
            },
            {
              title: "Sirius",
              entity: "sensor.sirius_nas_wr01b_power",
              color: "purple",
            },
            {
              title: "Vega",
              entity: "sensor.vega_nas_wr01b_power",
              color: "blue",
            },
          ],
        },
        {
          title: "PC",
          entity: "sensor.pc_nas_wr01b_power",
          color: "green",
        },
        {
          title: "Laptop",
          entity: "sensor.laptop_nas_wr01b_power",
          color: "blue",
        },
      ],
    },
    {
      title: "Fridge",
      entity: "sensor.fridge_nas_wr01b_power",
      color: "orange",
    },
    {
      title: "Dishwasher",
      entity: "sensor.dishwasher_nas_wr01b_power",
      color: "blue",
    },
    {
      title: "Kettle",
      entity: "sensor.kettle_nas_wr01b_power",
      color: "red",
    },
    {
      title: "Microwave Oven",
      entity: "sensor.microwave_oven_nas_wr01b_power",
      color: "yellow",
    },
    {
      title: "Air Conditioner",
      entity: "sensor.small_bedroom_ac_nas_wr01b_power",
      color: "teal",
    },
    {
      title: "Christmas Tree",
      entity: "sensor.christmas_tree_nas_wr01b_power",
      color: "green",
    },
    {
      title: "Masya Charging",
      entity: "sensor.masya_charging_nas_wr01b_power",
      color: "pink",
    },
  ],
}

export default function PowerFlowSegment() {
  return (
    <Flex gap="xs" vertical>
      <SegmentHeader icon={mdiTransitConnectionVariant} title="Power Flow" iconColor="purple"/>
      <PowerFlowCard sources={SOURCES} home={HOME}/>
    </Flex>
  )
}
