import {Auth} from "home-assistant-js-websocket";

export async function fetchMusicAssistant<T>(auth: Auth, path: string, params: Record<string, string>): Promise<T> {
  if (auth.expired)
    await auth.refreshAccessToken();

  const response = await fetch(`/api/music-assistant/${path}?${new URLSearchParams(params)}`, {
    headers: {Authorization: `Bearer ${auth.accessToken}`},
  });

  if (!response.ok)
    throw new Error(`Music Assistant request failed: ${response.status}`);

  return response.json();
}
