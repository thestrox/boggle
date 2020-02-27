// ACTION NAMES
export const INITIALIZE_BOARD = "INITIALIZE_BOARD";

export interface BoardState {
  board: string[][];
}

interface InitializeBoardAction {
  type: typeof INITIALIZE_BOARD;
  board: string[][];
}

export type BoardActionTypes = InitializeBoardAction;
