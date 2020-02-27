// ACTION NAMES
export const VALIDATION_FAILURE = "VALIDATION_FAILURE";
export const VALIDATION_SUCCESS = "VALIDATION_SUCCESS";

export interface ScoreState {
  wordScoreMap: { [key: string]: number };
}

interface ValidationFailureAction {
  type: typeof VALIDATION_FAILURE;
  word: string;
}

interface ValidationSuccessAction {
  type: typeof VALIDATION_SUCCESS;
  word: string;
  score: number;
}

export type ScoreActionTypes =
  | ValidationFailureAction
  | ValidationSuccessAction;
