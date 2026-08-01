import { DISCORD_BASE_URL } from "../constants/urls";

export async function muteUser(
  userId: string,
  guildId: string,
  token: string
): Promise<void> {
  try {
    const response = await fetch(
      `${DISCORD_BASE_URL}/guilds/${guildId}/members/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${token}`,
        },
        body: JSON.stringify({
          mute: true,
          channel_id: null,
        }),
      }
    );

    if (response.ok) {
      console.log("User muted successfully");
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

export async function unmuteUser(
  userId: string,
  guildId: string,
  token: string
): Promise<void> {
  try {
    const response = await fetch(
      `${DISCORD_BASE_URL}/guilds/${guildId}/members/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bot ${token}`,
        },
        body: JSON.stringify({
          mute: false,
          channel_id: null,
        }),
      }
    );

    if (response.ok) {
      console.log("User unmuted successfully");
    } else {
      console.error(`Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}
