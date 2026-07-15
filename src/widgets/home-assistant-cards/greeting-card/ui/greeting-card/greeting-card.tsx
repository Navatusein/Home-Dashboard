"use client"

import {Card, ResponsiveToggler, Typography} from "@/shared/ui-kit";
import {useUser} from "@hakit/core";
import {GreetingMessagesTokens, GREETINGS_MESSAGES} from "@/shared/constants/greeting-messages";

export default function GreetingCard() {
  const user = useUser();
  const partOfDay = Math.floor((new Date()).getHours() / 6) as GreetingMessagesTokens;

  return (
    <Card outline padding={0}>
      <ResponsiveToggler breakpoint="md" hide>
        <Typography.Title>
          {GREETINGS_MESSAGES[partOfDay]}, {user?.name}!
        </Typography.Title>
      </ResponsiveToggler>
    </Card>
  )
}
