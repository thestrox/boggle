import {
  ScoreState,
  ScoreActionTypes,
  VALIDATION_FAILURE,
  VALIDATION_SUCCESS
} from "./types";
import { RESET_ACTION } from "../common-actions";

const initialState: ScoreState = {
  wordScoreMap: {}
};

export function scoreReducer(
  state = initialState,
  action: ScoreActionTypes
): ScoreState {
  switch (action.type) {
    case VALIDATION_SUCCESS:
      return {
        ...state,
        wordScoreMap: { ...state.wordScoreMap, [action.word.toUpperCase()]: action.score }
      };

    case VALIDATION_FAILURE:
      return state;

    case RESET_ACTION:
      return {
        ...state,
        wordScoreMap: {}
      };
    default:
      return state;
  }
}
