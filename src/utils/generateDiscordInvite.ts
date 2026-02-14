import { STAGING_DISCORD_ROLE_IDS } from "../constants/discordRoles";
import { INVITE_OPTIONS } from "../constants/inviteOptions";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  INVITED_CREATED,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  UNAUTHORIZED,
} from "../constants/responses";
import { DISCORD_BASE_URL } from "../constants/urls";
import { env } from "../typeDefinitions/default.types";
import { inviteLinkBody } from "../typeDefinitions/discordLink.types";
import createDiscordHeaders from "./createDiscordHeaders";
import { getInviteRoleId } from "./getInviteRoleIds";

export async function generateDiscordLink(
  body: inviteLinkBody,
  env: env,
  reason?: string
) {
  let roleIds: string[];
  try {
    const applicationRoleId = getInviteRoleId(body.role, env);
    roleIds = [
      applicationRoleId,
      STAGING_DISCORD_ROLE_IDS.UNVERIFIED,
      STAGING_DISCORD_ROLE_IDS.NEW,
    ];
  } catch {
    return BAD_REQUEST;
  }

  const { channelId } = body;
  const generateInviteUrl = `${DISCORD_BASE_URL}/channels/${channelId}/invites`;

  const inviteOptions = {
    max_uses: INVITE_OPTIONS.MAX_USE, // Maximum number of times the invite can be used
    unique: INVITE_OPTIONS.UNIQUE, // Whether to create a unique invite or not
    role_ids: roleIds,
  };
  try {
    const headers: HeadersInit = createDiscordHeaders({
      reason,
      token: env.DISCORD_TOKEN,
    });
    const response = await fetch(generateInviteUrl, {
      method: "POST",
      body: JSON.stringify(inviteOptions),
      headers,
    });

    if (response.ok) {
      const data = await response.json();
      return { message: INVITED_CREATED, data };
    } else {
      if (response.status === 400) {
        return BAD_REQUEST;
      }

      if (response.status === 401) {
        return UNAUTHORIZED;
      }

      if (response.status === 404) {
        return NOT_FOUND;
      }

      if (response.status === 429) {
        return TOO_MANY_REQUESTS;
      }

      return INTERNAL_SERVER_ERROR;
    }
  } catch (err) {
    return INTERNAL_SERVER_ERROR;
  }
}
