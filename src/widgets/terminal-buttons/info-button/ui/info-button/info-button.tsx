"use client"

import {BaseButton, BaseButtonSharedProps} from "@/widgets/terminal-buttons/base-button";
import {useEffect, useState} from "react";
import {TerminalModal} from "@/features/terminal-modal";
import {Grid} from "@/shared/ui-kit";
import AlarmIcon from "@public/icons/date-and-time/alarm.svg"

type Props = BaseButtonSharedProps

export default function InfoButton(props: Props) {
  const [time, setTime] = useState(new Date());
  const [timer, setTimer] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setTimer((prevState) => {
        if (prevState > 0)
          return prevState - 1;

        return prevState;
      })
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderInfoString = () => {
    const infoStrings = [
      time.toLocaleTimeString(),
      time.toLocaleDateString()
    ];

    if (timer != 0)
      infoStrings[0] = infoStrings[0] + ` (${timer})`

    return infoStrings.join("\n");
  }

  return (
    <>
      <BaseButton
        {...props}
        suppressHydrationWarning={true}
        title={renderInfoString()}
        colSpan={props.colSpan ?? 2}
        onClickAction={() => setIsModalOpen(true)}
      />
      <TerminalModal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        <Grid.Section rowStart={2} colStart={5} direction="horizontal">
          <BaseButton icon={AlarmIcon} title="30s" onClickAction={() => setTimer(30)}/>
          <BaseButton icon={AlarmIcon} title="45s" onClickAction={() => setTimer(45)}/>
          <BaseButton icon={AlarmIcon} title="60s" onClickAction={() => setTimer(60)}/>
          <BaseButton icon={AlarmIcon} title="120s" onClickAction={() => setTimer(120)}/>
        </Grid.Section>
      </TerminalModal>
    </>
  )
}