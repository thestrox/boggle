import { AppThunk } from ".";
import { getBoard } from "../services/api";
import { initializeBoard } from "./board/actions";
import { toast } from "react-toastify";
import { GAME_LOADED } from "../shared/constants/messages";

export const initializeNewBoard = (): AppThunk => async dispatch => {
  const response = await getBoard();
  if (response.success) {
    dispatch(initializeBoard(response.data.board));
    toast.success(GAME_LOADED);
  } else {
    toast.error(response.message);
  }
};
