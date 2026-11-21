const VERIFIED_TTL = 60_000;

const verifiedTokens = new Map<string, number>();

export async function isHomeAssistantUser(authorization: string | null) {
  if (!authorization || !process.env.HOME_ASSISTANT_URL)
    return false;

  const now = Date.now();

  if ((verifiedTokens.get(authorization) ?? 0) > now)
    return true;

  const response = await fetch(new URL("/api/", process.env.HOME_ASSISTANT_URL), {headers: {Authorization: authorization}});

  if (!response.ok)
    return false;

  for (const [token, expiresAt] of verifiedTokens) {
    if (expiresAt <= now)
      verifiedTokens.delete(token);
  }

  verifiedTokens.set(authorization, now + VERIFIED_TTL);
  return true;
}
