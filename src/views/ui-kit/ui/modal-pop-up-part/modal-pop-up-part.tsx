"use client"

import {Card, Flex, ModalPopUp, Typography} from "@/shared/ui-kit";
import {useState} from "react";
import {mdiSofa} from '@mdi/js';

export default function ModalPopUpPart() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <Flex vertical gap="sm">
      <Typography.Paragraph>Modal Pop Up</Typography.Paragraph>
      <Flex gap="sm">
        <Card style={{width: "100%"}} clickable onClick={() => {setIsModalOpen(true)}}>
          <Typography.Paragraph>Modal PopUp</Typography.Paragraph>
        </Card>
      </Flex>
      <ModalPopUp isOpen={isModalOpen} close={() => {setIsModalOpen(false)}}>
        <ModalPopUp.Header title="Modal PopUp" icon={mdiSofa}/>
      </ModalPopUp>
    </Flex>
  )
}
