import { NEW_BOARD, VALIDATE } from "../shared/constants/endpoints";
import {
  NewGameResponse as NewBoardResponse,
  Response,
  ValidateRequest,
  ValidateWordResponse
} from "../shared/types/api-types";

export async function getBoard(): Promise<Response<NewBoardResponse>> {
  try {
    const response = await fetch(NEW_BOARD);
    return await response.json();
  } catch (error) {
    return { success: false, message: error, data: null };
  }
}

export async function validateWordApi(
  validateReqestBody: ValidateRequest
): Promise<Response<ValidateWordResponse>> {
  try {
    const response = await fetch(VALIDATE, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(validateReqestBody)
    });
    return await response.json();
  } catch (error) {
    return { success: false, message: error, data: null };
  }
}
