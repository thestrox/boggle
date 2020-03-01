import { INITIALIZE_BOARD, BoardActionTypes } from "./types";

export function initializeBoard(
  board: string[][],
  duration: number
): BoardActionTypes {
  return {
    type: INITIALIZE_BOARD,
    board: board,
    duration: duration,
    gameStartDate: Date.now()
  };
}
