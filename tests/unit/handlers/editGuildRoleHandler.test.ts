import { generateDummyRequestObject, guildEnv } from "../../fixtures/fixture";
import * as responseConstants from "../../../src/constants/responses";
import * as verifyTokenUtils from "../../../src/utils/verifyAuthToken";
import { editGuildRoleHandler } from "../../../src/controllers/editGuildRolesHandler";
import * as editGuildRoleUtils from "../../../src/utils/editGroupRole";

describe("editGuildRoleHandler", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const roleId = "1A32BEX04";
  it("should return BAD_SIGNATURE when authorization header is not provided", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {
        roleId: roleId,
      },
      method: "PATCH",
    });
    const response = await editGuildRoleHandler(mockRequest, guildEnv);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(responseConstants.BAD_SIGNATURE);
  });
  it("should return NOT_IMPLEMENTED when dev is false", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {
        roleId: roleId,
      },
      query: {
        dev: "false",
      },
      method: "PATCH",
      headers: { Authorization: "Bearer testtoken" },
    });
    const response = await editGuildRoleHandler(mockRequest, guildEnv);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(responseConstants.NOT_IMPLEMENTED);
  });
  it("should return BAD_REQUEST when roleId is not valid", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {
        roleId: "",
      },
      query: {
        dev: "true",
      },
      method: "PATCH",
      headers: { Authorization: "Bearer testtoken" },
    });
    const response = await editGuildRoleHandler(mockRequest, guildEnv);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(responseConstants.BAD_REQUEST);
  });
  it("should return INTERNAL_SERVER_ERROR when token is not verified", async () => {
    const expectedResponse = responseConstants.INTERNAL_SERVER_ERROR;
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {
        roleId: roleId,
      },
      query: {
        dev: "true",
      },
      method: "PATCH",
      headers: { Authorization: "Bearer testtoken" },
    });
    jest
      .spyOn(verifyTokenUtils, "verifyNodejsBackendAuthToken")
      .mockRejectedValue(expectedResponse);
    const response = await editGuildRoleHandler(mockRequest, guildEnv);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(expectedResponse);
  });
  it("should return INTERNAL_SERVER_ERROR when update fails", async () => {
    const expectedResponse = responseConstants.INTERNAL_SERVER_ERROR;
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      params: {
        roleId: roleId,
      },
      query: {
        dev: "true",
      },
      method: "PATCH",
      headers: { Authorization: "Bearer testtoken" },
      body: JSON.stringify({ rolename: "New Role Name" }),
    });
    jest
      .spyOn(verifyTokenUtils, "verifyNodejsBackendAuthToken")
      .mockResolvedValueOnce();
    const response = await editGuildRoleHandler(mockRequest, guildEnv);
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual(expectedResponse);
  });
  it("should return ok response when role is updated", async () => {
    const expectedResponse = new Response(null, {
      status: 204,
    });
    const mockRequest = generateDummyRequestObject({
      url: "/roles",
      method: "PATCH",
      params: {
        roleId: roleId,
      },
      query: {
        dev: "true",
      },
      headers: { Authorization: "Bearer testtoken" },
      json: () => Promise.resolve({ rolename: "something" }),
    });
    const verifyTokenSpy = jest
      .spyOn(verifyTokenUtils, "verifyNodejsBackendAuthToken")
      .mockResolvedValueOnce();
    const editGuildRoleSpy = jest
      .spyOn(editGuildRoleUtils, "editGuildRole")
      .mockResolvedValueOnce(responseConstants.ROLE_UPDATED);
    const response = await editGuildRoleHandler(mockRequest, guildEnv);

    expect(verifyTokenSpy).toHaveBeenCalledTimes(1);
    expect(editGuildRoleSpy).toHaveBeenCalledTimes(1);
    expect(response).toEqual(expectedResponse);
    expect(response.status).toEqual(expectedResponse.status);
  });
});
