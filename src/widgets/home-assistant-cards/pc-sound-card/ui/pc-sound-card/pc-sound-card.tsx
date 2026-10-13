import {useState} from "react";
import {Card, Flex, RoundedIcon, Slider, Typography} from "@/shared/ui-kit";
import {isOffState, isUnavailableState, useEntity} from "@hakit/core";
import {mdiMicrophone, mdiSpeaker, mdiVolumeHigh, mdiVolumeOff} from "@mdi/js";
import {EntityNameNumber, EntityNameSelect, EntityNameSwitch} from "@/shared/types/ha-domains";
import DeviceMenu from "../device-menu/device-menu";

type Props = {
  volumeEntity: EntityNameNumber,
  muteEntity: EntityNameSwitch,
  outputEntity: EntityNameSelect,
  inputEntity: EntityNameSelect,
}

export default function PcSoundCard(props: Props) {
  const volume = useEntity(props.volumeEntity);
  const mute = useEntity(props.muteEntity);
  const output = useEntity(props.outputEntity);
  const input = useEntity(props.inputEntity);

  const [dragValue, setDragValue] = useState<number | null>(null);

  const isUnavailable = isUnavailableState(volume.state);
  const isMuted = !isUnavailableState(mute.state) && !isOffState(mute.state);

  const value = dragValue ?? (isUnavailable ? 0 : Number(volume.state));

  const devices = [output, input]
    .filter((device) => !isUnavailableState(device.state))
    .map((device) => device.state);

  const toggleMute = () => {
    if (!isUnavailableState(mute.state))
      mute.service.toggle();
  }

  const changeValue = (value: number) => {
    setDragValue(null);
    volume.service.setValue({serviceData: {value: `${value}`}});
  }

  return (
    <Card
      stackCount={2}
      padding="xs"
      clickable
      color={isMuted ? "red" : undefined}
      onClick={toggleMute}
    >
      <Flex vertical justify="space-between" style={{height: "100%"}}>
        <Flex align="center" justify="space-between" gap="xs">
          <Flex align="center" gap="xs">
            <RoundedIcon path={isMuted ? mdiVolumeOff : mdiVolumeHigh}/>
            <Flex vertical>
              <Typography.Text bold>
                {isUnavailable ? "--" : (isMuted ? "Muted" : `${value} ${volume.attributes.unit_of_measurement ?? ""}`)}
              </Typography.Text>
              <Typography.Text fontSize="sm" textColor="secondary">
                {devices.length > 0 ? devices.join(" · ") : "--"}
              </Typography.Text>
            </Flex>
          </Flex>
          <Flex data-clickable gap="xs" onClick={(event) => event.stopPropagation()}>
            <DeviceMenu
              icon={mdiSpeaker}
              entity={props.outputEntity}
            />
            <DeviceMenu
              icon={mdiMicrophone}
              entity={props.inputEntity}
            />
          </Flex>
        </Flex>
        <div data-clickable onClick={(event) => event.stopPropagation()}>
          <Slider
            thumb
            tone={isMuted ? "darker" : undefined}
            min={volume.attributes.min ?? 0}
            max={volume.attributes.max ?? 100}
            step={volume.attributes.step ?? 1}
            value={[value]}
            disabled={isUnavailable}
            onValueChange={(value) => setDragValue(value[0])}
            onValueCommit={(value) => changeValue(value[0])}
          />
        </div>
      </Flex>
    </Card>
  )
}
