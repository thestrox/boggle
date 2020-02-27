import { BoardState, BoardActionTypes, INITIALIZE_BOARD } from "./types";

const initialState: BoardState = {
  board: [[]]
};

export function boardReducer(
  state = initialState,
  action: BoardActionTypes
): BoardState {
  switch (action.type) {
    case INITIALIZE_BOARD:
      return {
        ...state,
        board: action.board
      };
    default:
      return state;
  }
}
