import {
  PRODUCTION_APPLICATION_ROLE_TO_DISCORD_ID,
  STAGING_APPLICATION_ROLE_TO_DISCORD_ID,
} from "../constants/discordRoles";
import type { env } from "../typeDefinitions/default.types";

export function getInviteRoleId(role: string, env: env): string {
  const normalizedRole = role?.toLowerCase().trim();
  if (!normalizedRole) {
    throw new Error("Role is required");
  }

  const isProduction = env.CURRENT_ENVIRONMENT === "production";
  const applicationRoleToDiscordId = isProduction
    ? PRODUCTION_APPLICATION_ROLE_TO_DISCORD_ID
    : STAGING_APPLICATION_ROLE_TO_DISCORD_ID;

  const roleId = applicationRoleToDiscordId[normalizedRole];
  if (!roleId) {
    throw new Error(`Invalid role: ${role}`);
  }
  return roleId;
}
