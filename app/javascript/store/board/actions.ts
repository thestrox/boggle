import { INITIALIZE_BOARD, BoardActionTypes } from "./types";

export function initializeBoard(board: string[][]): BoardActionTypes {
  return {
    type: INITIALIZE_BOARD,
    board: board
  };
}
