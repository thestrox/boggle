import { BoardState, BoardActionTypes, INITIALIZE_BOARD } from "./types";
import { RESET_ACTION, ResetActionType } from "../common-actions";

const initialState: BoardState = {
  board: [[]],
  duration: null,
  gameStartDate: Date.now()
};

export function boardReducer(
  state = initialState,
  action: BoardActionTypes | ResetActionType
): BoardState {
  switch (action.type) {
    case INITIALIZE_BOARD:
      return {
        ...state,
        board: action.board,
        duration: action.duration,
        gameStartDate: action.gameStartDate
      };
    case RESET_ACTION:
      return {
        ...state,
        gameStartDate: Date.now()
      };
    default:
      return state;
  }
}
