import {Card, Flex, Typography} from "@/shared/ui-kit";
import {useHass, useUser} from "@hakit/core";
import {GreetingMessagesTokens, GREETINGS_MESSAGES} from "@/shared/constants/greeting-messages";
import {EntityNamePerson} from "@/shared/types/ha-domains";
import PersonAvatar from "../person-avatar/person-avatar";

type Props = {
  persons: EntityNamePerson[];
  room: string;
  onPersonClick?: (person: EntityNamePerson) => void;
}

export default function WelcomeCard(props: Props) {
  const user = useUser();
  const currentPerson = useHass((state) => props.persons.find((person) => state.entities[person]?.attributes.user_id == user?.id));

  const partOfDay = Math.floor((new Date()).getHours() / 6) as GreetingMessagesTokens;

  return (
    <Card outline padding="xs">
      <Flex align="center" justify="space-between" gap="xs">
        <Flex align="center" gap="xs">
          {currentPerson && (
            <PersonAvatar
              person={currentPerson}
              onClick={props.onPersonClick && (() => props.onPersonClick?.(currentPerson))}
            />
          )}
          <Flex vertical>
            <Typography.Text bold>
              {GREETINGS_MESSAGES[partOfDay]}, {user?.name}!
            </Typography.Text>
            <Typography.Text fontSize="sm" textColor="secondary">
              Room: {props.room}
            </Typography.Text>
          </Flex>
        </Flex>
        <Flex gap="xxs">
          {props.persons.filter((person) => person != currentPerson).map((person) => (
            <PersonAvatar
              key={person}
              person={person}
              onClick={props.onPersonClick && (() => props.onPersonClick?.(person))}
            />
          ))}
        </Flex>
      </Flex>
    </Card>
  )
}
