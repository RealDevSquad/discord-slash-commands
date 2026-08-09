import { sendTaskUpdatesHandler } from "../../../src/controllers/taskUpdatesHandler";
import JSONResponse from "../../../src/utils/JsonResponse";
import * as response from "../../../src/constants/responses";
import { sendTaskUpdate } from "../../../src/utils/sendTaskUpdates";
import { generateDummyRequestObject } from "../../fixtures/fixture";

jest.mock("../../../src/utils/verifyAuthToken", () => ({
  verifyNodejsBackendAuthToken: jest.fn().mockResolvedValue(true),
}));
jest.mock("../../../src/utils/sendTaskUpdates", () => ({
  sendTaskUpdate: jest.fn().mockResolvedValue(undefined),
}));
describe("sendTaskUpdatesHandler", () => {
  const mockEnv = { DISCORD_TOKEN: "mockToken" };
  const mockData = {
    content: {
      completed: "Wrote test cases",
      planned: "Will test the feature at staging.",
      blockers: "NA",
      userName: "12345678910",
      taskId: "79wMEIek990",
      taskTitle: "Hyperlink as task Title",
    },
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("sendTaskUpdate function should return undefined after successfully sending the message", async () => {
    const { completed, planned, blockers, userName, taskId, taskTitle } =
      mockData.content;
    const response = await sendTaskUpdate(
      { completed, planned, blockers, userName, taskId, taskTitle },
      mockEnv
    );
    expect(response).toBe(undefined);
  });

  it("should return Bad Signature object if no auth headers provided", async () => {
    const mockRequest = generateDummyRequestObject({ url: "/progress" });
    const result: JSONResponse = await sendTaskUpdatesHandler(
      mockRequest,
      mockEnv
    );
    const jsonResponse: { error: string } = await result.json();
    expect(result.status).toBe(401);
    expect(jsonResponse).toEqual(response.UNAUTHORIZED);
  });
  it("should return success response if task update is sent successfully", async () => {
    const mockRequest = generateDummyRequestObject({
      url: "/progress",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer dummyToken",
      },
    });
    mockRequest.json = jest.fn().mockResolvedValue(mockData);
    const result: JSONResponse = await sendTaskUpdatesHandler(
      mockRequest,
      mockEnv
    );
    expect(result.status).toBe(200);
    const res: JSONResponse = await result.json();
    expect(res).toBe(response.TASK_UPDATE_SENT_MESSAGE);
  });
});
