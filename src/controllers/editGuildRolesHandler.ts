// This function updates group-role in discord.
import * as response from "../constants/responses";
import { IRequest } from "itty-router";
import { env } from "../typeDefinitions/default.types";
import JSONResponse from "../utils/JsonResponse";
import { verifyNodejsBackendAuthToken } from "../utils/verifyAuthToken";
import { updateRole } from "../typeDefinitions/discordMessage.types";
import { editGuildRole } from "../utils/editGroupRole";

export async function editGuildRoleHandler(request: IRequest, env: env) {
  const authHeader = request.headers.get("Authorization");
  const reason = request.headers.get("X-Audit-Log-Reason");
  const roleId = decodeURI(request.params?.roleId ?? "");
  const { dev } = request.query;
  const devFlag = dev === "true";

  if (!authHeader) {
    return new JSONResponse(response.BAD_SIGNATURE, { status: 401 });
  }

  if (!devFlag) {
    return new JSONResponse(response.NOT_IMPLEMENTED, { status: 501 });
  }
  if (!roleId) {
    return new JSONResponse(response.BAD_REQUEST, { status: 400 });
  }
  try {
    await verifyNodejsBackendAuthToken(authHeader, env);
    const body: updateRole = await request.json();
    const result = await editGuildRole(body.rolename, roleId, env, reason);

    if (result === response.ROLE_UPDATED) {
      return new Response(null, { status: 204 });
    } else {
      return new JSONResponse(response.INTERNAL_SERVER_ERROR, {
        status: 500,
      });
    }
  } catch (err) {
    console.log("Error updating guild role: ", err);
    return new JSONResponse(response.INTERNAL_SERVER_ERROR, {
      status: 500,
    });
  }
}
