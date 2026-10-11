import {Flex, ModalPopUp, Typography} from "@/shared/ui-kit";
import {Chips} from "@/shared/ui-kit/chips";
import {mdiPackageUp, mdiUpdate} from "@mdi/js";
import {useHass} from "@hakit/core";
import {QueryModalControl} from "@/features/query-modal-control";
import {StateCard} from "@/widgets/home-assistant-cards/state-card";
import {parseRows, selectUpdates} from "../../helpers/admin-selectors";

export default function UpdatesModal() {
  const updates = parseRows(useHass((state) => selectUpdates(state.entities)));

  return (
    <QueryModalControl modal="updates">
      <ModalPopUp.Header title="Updates" icon={mdiUpdate}>
        <Flex justify="center" gap="xs">
          <Chips
            text={`${updates.length} available`}
            icon={mdiPackageUp}
            iconColor={updates.length > 0 ? "orange" : "green"}
          />
        </Flex>
      </ModalPopUp.Header>
      <ModalPopUp.Content>
        <Flex vertical gap="xs">
          {updates.length == 0 && (
            <Typography.Text textColor="secondary">
              Everything is up to date
            </Typography.Text>
          )}
          {updates.map(([entityId, name, installedVersion, latestVersion]) => (
            <StateCard
              key={entityId}
              title={name}
              text={`${installedVersion} → ${latestVersion}`}
              icon={mdiPackageUp}
            />
          ))}
        </Flex>
      </ModalPopUp.Content>
    </QueryModalControl>
  )
}
