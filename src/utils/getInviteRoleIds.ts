import config from "../../config/config";
import type { env } from "../typeDefinitions/default.types";

export function getInviteRoleId(role: string, env: env): string {
  const normalizedRole = role?.trim().toUpperCase();
  if (!normalizedRole) throw new Error("Role is required");

  const roleIds = config(env).DISCORD_ROLE_IDS[normalizedRole];
  if (!roleIds) throw new Error(`Invalid role: ${role}`);

  return roleIds;
}
