import { BoardState, BoardActionTypes, INITIALIZE_BOARD } from "./types";
import { RESET_ACTION } from "../common-actions";

const initialState: BoardState = {
  board: [[]],
  duration: null,
  gameStartDate: null
};

export function boardReducer(
  state = initialState,
  action: BoardActionTypes
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
