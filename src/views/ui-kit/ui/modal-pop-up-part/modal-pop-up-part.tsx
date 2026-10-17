"use client"

import {Card, Flex, ModalPopUp, Typography} from "@/shared/ui-kit";
import {useState} from "react";
import {mdiAirConditioner, mdiSofa} from '@mdi/js';

export default function ModalPopUpPart() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCenterModalOpen, setIsCenterModalOpen] = useState<boolean>(false);

  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Modal Pop Up</Typography.Paragraph>
      <Flex gap="sm">
        <Card style={{width: "100%"}} clickable onClick={() => {setIsModalOpen(true)}}>
          <Typography.Paragraph>Modal PopUp</Typography.Paragraph>
        </Card>
        <Card style={{width: "100%"}} clickable onClick={() => {setIsCenterModalOpen(true)}}>
          <Typography.Paragraph>Modal PopUp Center</Typography.Paragraph>
        </Card>
      </Flex>
      <ModalPopUp isOpen={isModalOpen} close={() => {setIsModalOpen(false)}}>
        <ModalPopUp.Header title="Modal PopUp" icon={mdiSofa}/>
      </ModalPopUp>
      <ModalPopUp placement="center" isOpen={isCenterModalOpen} close={() => {setIsCenterModalOpen(false)}}>
        <ModalPopUp.Header title="Modal PopUp Center" icon={mdiAirConditioner}/>
        <ModalPopUp.Content>
          <Card style={{height: 300}}/>
        </ModalPopUp.Content>
      </ModalPopUp>
    </Flex>
  )
}
