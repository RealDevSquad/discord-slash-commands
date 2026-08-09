import { DISCORD_BASE_URL } from "../../../src/constants/urls";
import { editGuildRole } from "../../../src/utils/editGroupRole";
import JSONResponse from "../../../src/utils/JsonResponse";
import { guildEnv } from "../../fixtures/fixture";
import * as response from "../../../src/constants/responses";

describe("editGuildRole", () => {
  const roleid = "1A32BEX04";
  const rolename = "something";

  const editGuildRoleUrl = `${DISCORD_BASE_URL}/guilds/${guildEnv.DISCORD_GUILD_ID}/roles/${roleid}`;
  const mockRequestInit = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${guildEnv.DISCORD_TOKEN}`,
      "X-Audit-Log-Reason": "This is reason for this action",
    },
    body: JSON.stringify({ name: rolename, mentionable: true }),
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it("should pass the reason to discord as a X-Audit-Log-Reason header if provided", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation((inp) => Promise.resolve(new JSONResponse(inp)));

    await editGuildRole(
      rolename,
      roleid,
      guildEnv,
      "This is reason for this action"
    );

    expect(global.fetch).toHaveBeenCalledWith(
      editGuildRoleUrl,
      mockRequestInit
    );
  });

  it("should return ROLE_UPDATED when response is ok", async () => {
    const expectedResponse = new Response(null, {
      status: 204,
    });
    jest.spyOn(global, "fetch").mockResolvedValue(expectedResponse);
    const result = await editGuildRole(rolename, roleid, guildEnv);
    expect(result).toEqual(response.ROLE_UPDATED);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  it("should return INTERNAL_SERVER_ERROR when response is not ok", async () => {
    const expectedErrorResponse = new Response(response.INTERNAL_SERVER_ERROR);
    jest.spyOn(global, "fetch").mockRejectedValue(expectedErrorResponse);
    const result = await editGuildRole(rolename, roleid, guildEnv);
    expect(result).toEqual(response.INTERNAL_SERVER_ERROR);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
