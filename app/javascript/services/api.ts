import { NEW_BOARD } from "../shared/constants/endpoints";
import { BoardData, Response } from "../shared/types/response";

export async function getBoard(): Promise<Response<BoardData>> {
  try {
    const response = await fetch(NEW_BOARD);
    return await response.json();
  } catch (error) {
    return { success: false, message: error, data: null };
  }
}
