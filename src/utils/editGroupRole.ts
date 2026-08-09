import { INTERNAL_SERVER_ERROR, ROLE_UPDATED } from "../constants/responses";
import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";

import createDiscordHeaders from "./createDiscordHeaders";

export async function editGuildRole(
  rolename: string,
  roleid: string,
  env: env,
  reason?: string
) {
  const editGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${env.DISCORD_GUILD_ID}/roles/${roleid}`;

  const headers: HeadersInit = createDiscordHeaders({
    reason,
    token: env.DISCORD_TOKEN,
  });
  const data = {
    name: rolename,
    mentionable: true,
  };
  try {
    const response = await fetch(editGuildRoleUrl, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });
    if (response.ok) {
      return ROLE_UPDATED;
    } else {
      return INTERNAL_SERVER_ERROR;
    }
  } catch (err) {
    return INTERNAL_SERVER_ERROR;
  }
}
