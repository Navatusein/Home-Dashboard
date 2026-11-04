"use client"

import {BootstrapGrid, Card, Flex, RoundedIcon, Typography} from "@/shared/ui-kit";
import {mdiAlertCircleOutline} from "@mdi/js";

type Props = {
  error: unknown;
  retry: () => void;
}

export default function ErrorView(props: Props) {
  const message = props.error instanceof Error ? props.error.message : String(props.error);

  return (
    <BootstrapGrid.Row verticalGutter="sm" horizontalGutter="sm">
      <BootstrapGrid.Column span={8} lg={12} md={24}>
        <Card stackCount={1} padding="xs" color="red" clickable onClick={props.retry}>
          <Flex align="center" gap="xs" style={{height: "100%"}}>
            <RoundedIcon path={mdiAlertCircleOutline}/>
            <Flex vertical>
              <Typography.Text>
                Something went wrong
              </Typography.Text>
              <Typography.Text fontSize="sm" textColor="secondary">
                {message}
              </Typography.Text>
            </Flex>
          </Flex>
        </Card>
      </BootstrapGrid.Column>
    </BootstrapGrid.Row>
  )
}
