import {
  ScoreState,
  ScoreActionTypes,
  VALIDATION_FAILURE,
  VALIDATION_SUCCESS
} from "./types";

const initialState: ScoreState = {
  wordList: []
};

export function scoreReducer(
  state = initialState,
  action: ScoreActionTypes
): ScoreState {
  switch (action.type) {
    case VALIDATION_SUCCESS:
      return {
        ...state,
        wordList: [...state.wordList, action.word]
      };

    case VALIDATION_FAILURE:
      return state;
    default:
      return state;
  }
}
