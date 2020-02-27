import {
  ScoreState,
  ScoreActionTypes,
  VALIDATION_FAILURE,
  VALIDATION_SUCCESS
} from "./types";

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
        wordScoreMap: { ...state.wordScoreMap, [action.word]: action.score }
      };

    case VALIDATION_FAILURE:
      return state;
    default:
      return state;
  }
}
