import { AppThunk } from ".";
import { getBoard, validateWordApi } from "../services/api";
import { initializeBoard } from "./board/actions";
import { validatationSuccess } from "./score/actions";
import { toast } from "react-toastify";
import {
  GAME_LOADED,
  CORRECT,
  INVALID_WORD
} from "../shared/constants/messages";
import { ValidateRequest } from "../shared/types/api-types";
import { reset } from "./common-actions";

export const initializeNewBoard = (): AppThunk => async dispatch => {
  const response = await getBoard();
  if (response.success) {
    toast.success(GAME_LOADED);
    dispatch(initializeBoard(response.data.board, response.data.duration));
  } else {
    toast.error(response.message);
  }
};

export const validateWord = (
  validateRequestBody: ValidateRequest
): AppThunk => async dispatch => {
  const response = await validateWordApi(validateRequestBody);
  if (response.success) {
    if (response.data.score) {
      toast.success(CORRECT);
      dispatch(
        validatationSuccess(validateRequestBody.word, response.data.score)
      );
    } else {
      toast.error(INVALID_WORD);
    }
  } else {
    toast.error(response.message);
  }
};

export const resetBoard = (): AppThunk => dispatch => {
  dispatch(reset());
};
