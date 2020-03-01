import { ResetActionType } from "../common-actions";

// ACTION NAMES
export const INITIALIZE_BOARD = "INITIALIZE_BOARD";

export interface BoardState {
  board: string[][];
  duration: number;
  gameStartDate: number;
}

interface InitializeBoardAction {
  type: typeof INITIALIZE_BOARD;
  board: string[][];
  duration: number;
  gameStartDate: number;
}

export type BoardActionTypes = InitializeBoardAction | ResetActionType;
